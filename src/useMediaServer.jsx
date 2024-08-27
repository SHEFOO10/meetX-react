import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';

const socket = io('https://api.shefoo.tech/mediasoup');

const useMediaServer = (roomId) => {
  let device;
  let producerTransport;
  let consumerTransports = [];
  let consumingTransports = [];
  let videoContainer;

  const audioParams = useRef({});
  const videoParams = useRef({
    encodings: [
      { rid: 'r0', maxBitrate: 100000, scalabilityMode: 'S1T3' },
      { rid: 'r1', maxBitrate: 300000, scalabilityMode: 'S1T3' },
      { rid: 'r2', maxBitrate: 900000, scalabilityMode: 'S1T3' },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    }
  });

  const streamSuccess = (stream, localVideo) => {
    if (localVideo) {
      localVideo.srcObject = stream;
    }

    audioParams.current = { track: stream.getAudioTracks()[0], ...audioParams.current };
    videoParams.current = { track: stream.getVideoTracks()[0], ...videoParams.current };

    joinRoom(roomId);
  };

  const getLocalStream = async (localVideo, videoContainerElement) => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { min: 640, max: 1920 },
          height: { min: 400, max: 1080 },
        }
      });
      streamSuccess(localStream);
    } catch (e) {
      const localStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true
      });
      videoContainer = videoContainerElement;
      streamSuccess(localStream, localVideo);
    }
  };

  const joinRoom = (roomName) => {
    socket.emit('joinRoom', { roomName }, async (data) => {
      const rtpCapabilities = data.rtpCapabilities;
      await createDevice(rtpCapabilities);
    });
  };

  const createDevice = async (rtpCapabilities) => {
    try {
      const newDevice = new mediasoupClient.Device();
      await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
      device = newDevice;
      createSendTransport(newDevice);
    } catch (error) {
      console.error('Error creating device:', error);
      if (error.name === 'UnsupportedError') {
        console.warn('Browser not supported');
      }
    }
  };

  const createSendTransport = (device) => {
    socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
      if (params.error) {
        console.error('Error creating WebRTC transport:', params.error);
        return;
      }

      const newProducerTransport = device.createSendTransport(params);
      producerTransport = newProducerTransport;

      newProducerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          socket.emit('transport-connect', { dtlsParameters });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      newProducerTransport.on('produce', (parameters, callback, errback) => {
        try {
          socket.emit('transport-produce', {
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
            appData: parameters.appData,
          }, ({ id, producersExist }) => {
            callback({ id });
            if (producersExist) getProducers();
          });
        } catch (error) {
          errback(error);
        }
      });

      connectSendTransport(newProducerTransport);
    });
  };

  const connectSendTransport = async (producerTransport) => {
    console.log(audioParams.current.track)
    if (audioParams.current.track) {
        console.log('undefined !')
      const audioProducer = await producerTransport.produce(audioParams.current);
      audioProducer.on('trackended', () => console.log('Audio track ended'));
      audioProducer.on('transportclose', () => console.log('Audio transport ended'));
    }

    console.log(videoParams);
    const videoProducer = await producerTransport.produce(videoParams.current);
    videoProducer.on('trackended', () => console.log('Video track ended'));
    videoProducer.on('transportclose', () => console.log('Video transport ended'));
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    if (consumingTransports.includes(remoteProducerId)) return;

    consumingTransports.push(remoteProducerId);

    socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
      if (params.error) {
        console.error('Error creating WebRTC transport for consumer:', params.error);
        return;
      }

      const consumerTransport = device.createRecvTransport(params);

      consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          socket.emit('transport-recv-connect', { dtlsParameters, serverConsumerTransportId: params.id });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      connectRecvTransport(consumerTransport, remoteProducerId, params.id);
    });
  };

  const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
    socket.emit('consume', {
      rtpCapabilities: device.rtpCapabilities,
      remoteProducerId,
      serverConsumerTransportId,
    }, async ({ params }) => {
      if (params.error) {
        console.error('Cannot consume:', params.error);
        return;
      }

      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters
      });

      consumerTransports.push({ consumerTransport, serverConsumerTransportId: params.id, producerId: remoteProducerId, consumer });


      if (params.kind === 'audio') {
        const audioElement = document.createElement('audio');
        audioElement.id = `td-${remoteProducerId}`;
        audioElement.srcObject = new MediaStream([consumer.track]);
        videoContainer.appendChild(audioElement)
      } else if (params.kind === 'video') {
        const videoElement = document.createElement('video');
        videoElement.id = `td-${remoteProducerId}`;
        videoElement.srcObject = new MediaStream([consumer.track]);
        videoContainer.appendChild(videoElement)
      }
      socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
    });
  };

  const getProducers = () => {
    socket.emit('getProducers', producerIds => {
      producerIds.forEach(signalNewConsumerTransport);
    });
  };

  useEffect(() => {
    socket.on('connection-success', async ({ socketId }) => {
      console.log(socketId);
    });

    socket.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId));
    socket.on('producer-closed', ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId);
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId);
        document.getElementById(`td-${remoteProducerId}`)?.remove();
      }
    });

    return () => {
      socket.off('connection-success');
      socket.off('new-producer');
      socket.off('producer-closed');
    };
  }, [consumerTransports]);

  return { getLocalStream };
};

export default useMediaServer;

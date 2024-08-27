import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";


import { useState, useEffect, useRef } from "react";
import { SideChat } from "./components/side-chat";
import useMediaServer from "./useMediaServer";


export function Meet() {
    const { roomId } = useParams()
    // const [device, setDevice] = useState(null);
    const localVideoRef = useRef(null);
    const [audioMuted, setAudioMuted] = useState(false);

    const videoContainerRef = useRef(null);

    const { getLocalStream } = useMediaServer(roomId);
    useEffect(() => {
      const mediaStream = getLocalStream(localVideoRef.current, videoContainerRef.current);
      //localVideoRef.current.srcObject = mediaStream
      mediaStream.then(stream => localVideoRef.current.srcObject = stream)
      console.log(mediaStream);
    }, [])



    function handleMute() {

    }
    function handleEndCall(e) {
        localVideoRef.current.srcObj.getAudioTracks().forEach(audioTrack => audioTrack.enabled = !audioMuted);
        setAudioMuted(!audioMuted)
        if (audioMuted) {
          e.target.innerText = 'Unmute';
        } else {
          e.target.innerText = 'Mute';
        }
      }

    function handleShareScreen() {

    }

    const [opened, setOpened] = useState(false); 
    const chatRef = useRef(null);
    function handleToggleChat() {
      if (opened) {
        setOpened(false);
        chatRef.current.innerText = 'Open Chat'
      } else {
        setOpened(true);
        chatRef.current.innerText = 'Close Chat'
      }
    }

    const videos = [];

    for (let i = 1; i <= 2; i++) {
        videos.push(<video key={i} className="w-full h-[260px] bg-black rounded-md"></video>)
    }

    return (
        <>
            <SideChat opened={opened}/>
            <div className="w-screen h-screen flex justify-center items-center">
                <div id="videosContainer" className="w-3/4 h-[600px] p-2 lg:flex lg:justify-center md:grid md:grid-cols-2 grid grid-cols-1 grid-rows-2  gap-3 place-items-center">
                <video ref={localVideoRef} autoPlay playsInline  className="bg-black w-full max-w-[400px] h-[260px] rounded-md object-cover"></video>
                <div ref={videoContainerRef} id="videoContainer"></div>
                </div>
            </div>
            <footer
            className="
            w-screen h-[100px]
            fixed bottom-0
            flex justify-center items-center
            ">
                <Button ref={chatRef} className='mx-1 z-20' onClick={handleToggleChat}>Open Chat</Button>
                <Button className='mx-1' onClick={handleMute}>Mute</Button>
                <Button className='mx-1' onClick={handleEndCall}>End Call</Button>
                <Button className='mx-1' onClick={handleShareScreen}>Share Screen</Button>
            </footer>
        </>
    );
}

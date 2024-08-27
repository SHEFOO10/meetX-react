import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";


import { useState, useEffect, useRef } from "react";
import { SideChat } from "./components/side-chat";
import useMediaServer from "./useMediaServer";


export function Meet() {
    const { roomId } = useParams()
    // const [device, setDevice] = useState(null);
    const localVideoRef = useRef(null);
    const { local} = useMediaServer(roomId);
    useEffect(() => {
      localVideoRef.current.srcObj = mediaStream
    }, [])



    function handleMute() {

    }
    function handleEndCall() {
        
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
                <video key={1} ref={localVideoRef} autoPlay playsInline  className="bg-black w-full max-w-[400px] h-[260px] rounded-md object-cover"></video>
                <video key={2} id="remoteVideo" className="w-full h-[260px] bg-black rounded-md object-cover max-w-[400px]"></video>
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
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { checkLoggedIn } from "./components/auth"


export function Home() {
    const navigate = useNavigate()
    const meetRef = useRef(null);
    const handleJoin = () => {
        const meetId = meetRef.current.value
        if (meetId !== '')
            navigate(`/meet/${meetId}`)
    }

    function handleLogout () {
        navigate('/logout');
    }


    useEffect(() => {
       const dataPromise = checkLoggedIn()
       dataPromise.then(data => {
        if (!data.user) {
            navigate('/login')
        } else if (data.user) {
            console.log(data.user);
        };
       })
    }, [])
    return (
        <>
        <nav className="fixed w-full h-[80px] top-0 bg-black flex justify-end items-center"><Button className="mr-12" onClick={handleLogout}>Logout</Button></nav>
        <div className="h-screen w-screen flex justify-center items-center transition-all">
            <Card className='w-[400px] h-[220px]'>
                <CardHeader>
                    <CardTitle className='font-semibold font-mono' >Join Meeting</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='font-mono'>
                    <Label>Enter Meeting Id to join</Label>
                    <Input ref={meetRef} className='mt-2' placeholder="Meeting id"></Input>
                    <Button className="mt-4" onClick={handleJoin}>Join or Create</Button>
                </CardContent>
            </Card>
        </div>
        </>
    )
}

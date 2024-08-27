import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


export function Home() {
    const navigate = useNavigate()
    const meetRef = useRef(null);
    const handleJoin = () => {
        const meetId = meetRef.current.value
        if (meetId !== '')
            navigate(`/meet/${meetId}`)
    }
    return (
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
    )
}
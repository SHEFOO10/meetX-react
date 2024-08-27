"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

  
export function Login() {
    const emailElement = useRef(null);
    const passwordElement = useRef(null);
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const username = emailElement.current.value;
      const password = passwordElement.current.value;
      const credentials = { username, password };
  
      try {
          const response = await fetch('https://api.shefoo.tech/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
          });
  
          if (response.ok) {
              const data = await response.json();
              // Handle success (e.g., save token, redirect user)
              console.log('Login successful:', data);
              console.log(response)
              navigate('/')
            } else {
              // Handle errors (e.g., invalid credentials)
              console.error('Login failed:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
  
    const handleGoogleLogin = () => {
      window.open(
        'https://api.shefoo.tech/auth/google',
        '_self',
      );
    }
    return (
      <div className="h-screen w-screen flex justify-center items-center transition-all">

      <Card className="w-5/6 md:w-3/5 lg:w-2/4 font-mono transition-all">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to Your account</CardTitle>
          <CardDescription>
            You can login with Google !
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <Button variant="outline" onClick={handleGoogleLogin}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input ref={emailElement} id="email" type="email" placeholder="mail@example.com" />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="password">Password</Label>
                <Input ref={passwordElement} id="password" type="password" placeholder="Enter Your Password" />
              </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type='submit'>Login</Button>
          </CardFooter>
        </form>
      </Card>
      </div>
    )
}
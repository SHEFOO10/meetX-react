"use client"

import { Toaster } from "@/components/ui/toaster"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/6 lg:w-2/6 md:w-2/4 space-y-6 font-mono font-bold">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
                <a href="https://upgraded-space-happiness-x4xvp9q7v9r2997j-5000.app.github.dev/auth/google" className="w-full relative inline-block text-center pr-8 py-2 rounded-md border">
                  Sign in with Google
                  <span className="absolute right-5 transform after:content-[''] after:inline-block after:w-6 after:h-6 after:bg-[url('/google-logo.png')] after:bg-contain after:bg-no-repeat after:ml-2"></span>
                </a>
              <p className="text-center py-3">Or</p>
              <p>Continue with Email</p>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Toaster />
      </form>
    </Form>
  )
}

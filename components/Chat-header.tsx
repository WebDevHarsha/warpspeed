"use client"

import { CardHeader } from "@/components/ui/card"

const ChatHeader = () => {
  return (
    <CardHeader className="p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-foreground bg-clip-text text-transparent">Dialogic</span>{" "}
            AI Teacher
          </h1>
          <p className="text-sm mt-1 text-muted-foreground">Advanced Socratic learning powered by MetaLearn</p>
        </div>
      </div>
    </CardHeader>
  )
}

export default ChatHeader

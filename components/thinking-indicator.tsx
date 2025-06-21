"use client"

import { Card, CardContent } from "@/components/ui/card"

const ThinkingIndicator = () => {
  return (
    <div className="flex justify-start">
      <Card className="bg-card border">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ThinkingIndicator

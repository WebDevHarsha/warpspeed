"use client"

import { Brain } from "lucide-react"

const WelcomeScreen = () => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-primary-foreground text-xs">
            🤖
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Welcome to Dialogic</h3>
      <p className="text-muted-foreground">Start your advanced Socratic learning journey by asking a question!</p>
    </div>
  )
}

export default WelcomeScreen

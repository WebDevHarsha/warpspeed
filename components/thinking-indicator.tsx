"use client"

const ThinkingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
      <div className="flex space-x-1">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
      </div>
      <span>AI is thinking...</span>
    </div>
  )
}

export default ThinkingIndicator

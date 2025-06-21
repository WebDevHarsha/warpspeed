"use client"

import { useEffect } from "react"
import type { SpeechRecognitionEvent } from "@/types"

interface UseSpeechRecognitionProps {
  isListening: boolean
  setUserInput: (value: string) => void
  setIsListening: (listening: boolean) => void
}

export const useSpeechRecognition = ({ isListening, setUserInput, setIsListening }: UseSpeechRecognitionProps) => {
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("")
        setUserInput(transcript)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.start()
      } else {
        recognition.stop()
      }

      return () => {
        recognition.stop()
      }
    } else {
      console.log("Speech recognition not supported")
    }
  }, [isListening, setUserInput, setIsListening])
}

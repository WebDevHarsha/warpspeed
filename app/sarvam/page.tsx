"use client"

import { useState } from "react"
import { SarvamAIClient } from "sarvamai"

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.NEXT_PUBLIC_SARVAM_AI_API_KEY!,
})

const TextToSpeechClient = () => {
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handlePlay = async () => {
    setLoading(true)
    setAudioUrl(null)
    try {
      const response = await client.textToSpeech.convert({
        text: "In today’s fast-paced digital world, technology continues to transform the way we live, learn, and connect. From artificial intelligence powering everyday tools to real-time communication bridging global gaps, innovation drives progress at an unprecedented pace. As we adapt to these changes, the ability to think critically, learn continuously, and stay curious becomes more important than ever. Whether in education, business, or creative pursuits, embracing change and leveraging technology can unlock new possibilities and shape a better future for everyone.",
        model: "bulbul:v2",
        speaker: "anushka",
        target_language_code: "en-IN",
      })

      if (!response.audios || response.audios.length === 0) {
        throw new Error("No audio data received")
      }
     
      // Decode base64 to binary
      const binary = atob(response.audios[0])
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      // Create audio blob
      const blob = new Blob([bytes], { type: "audio/mp3" })
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)

      // Auto play
      const audio = new Audio(url)
      audio.play()
    } catch (error) {
      console.error("TTS Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!audioUrl) return
    const link = document.createElement("a")
    link.href = audioUrl
    link.download = "sarvam-output.mp3"
    link.click()
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center gap-4">
      <p className="text-center text-gray-800 dark:text-gray-200 text-lg font-medium">
        Click to generate & play voice
      </p>
      <button
        onClick={handlePlay}
        disabled={loading}
        className={`px-6 py-2 rounded-full text-white font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating Voice..." : "🔊 Play"}
      </button>

      {audioUrl && (
        <button
          onClick={handleDownload}
          className="text-sm mt-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
        >
          💾 Download Audio
        </button>
      )}
    </div>
  )
}

export default TextToSpeechClient

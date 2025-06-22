// Refactored using shadcn/ui components
"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { GoogleGenAI } from "@google/genai"
import { SarvamAIClient } from "sarvamai"
import { ScrollArea } from "@/components/ui/scroll-area"

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! })
const client = new SarvamAIClient({ apiSubscriptionKey: process.env.NEXT_PUBLIC_SARVAM_AI_API_KEY! })

export default function SleepLearningSummarizer() {
  const [documents, setDocuments] = useState<FileList | null>(null)
  const [summary, setSummary] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [timer, setTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isTimerActive && remainingTime > 0) {
      timerRef.current = setTimeout(() => setRemainingTime(prev => prev - 1), 1000)
    } else if (remainingTime === 0 && isTimerActive) {
      setIsTimerActive(false)
      handlePlayAudio()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isTimerActive, remainingTime])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocuments(e.target.files)
  }

  const readDocumentContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const generateSummary = async () => {
    if (!documents) return
    setIsProcessing(true)
    setSummary("")
    let content = ""
    for (let i = 0; i < documents.length; i++) {
      const file = documents[i]
      const text = await readDocumentContent(file)
      content += `Document ${i + 1}:\n${text}\n\n`
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: `Summarize calmly for sleep learning:\n${content}`,
      })
      setSummary(response.text || "")
    } catch (err) {
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlayAudio = async () => {
    if (!summary) return
    setIsGeneratingAudio(true)
    try {
      const response = await client.textToSpeech.convert({
        text: summary,
        model: "bulbul:v2",
        speaker: "anushka",
        target_language_code: "en-IN",
      })
      const binary = atob(response.audios[0])
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      const blob = new Blob([bytes], { type: "audio/mp3" })
      setAudioUrl(URL.createObjectURL(blob))
    } catch (err) {
      console.error("TTS error", err)
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const handleTimerStart = () => {
    if (timer > 0) {
      setRemainingTime(timer)
      setIsTimerActive(true)
    }
  }

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Sleep Learning: Document to Audio</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} />
          <Button onClick={generateSummary} disabled={isProcessing}>
            {isProcessing ? "Generating..." : "Generate Summary"}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Summary</h2>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {summary && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Audio Controls</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-center">
              <Label>Timer (sec)</Label>
              <Input type="number" value={timer} onChange={(e) => setTimer(+e.target.value)} />
              <Button onClick={handleTimerStart} disabled={isTimerActive}>
                Start Timer
              </Button>
              {isTimerActive && <span>{remainingTime}s</span>}
            </div>
            <Button onClick={handlePlayAudio} disabled={isGeneratingAudio}>
              {isGeneratingAudio ? "Converting..." : "Play Audio"}
            </Button>
            {audioUrl && (
              <audio controls src={audioUrl} className="w-full" />
            )}
          </CardContent>
        </Card>
      )}
    </main>
  )
}

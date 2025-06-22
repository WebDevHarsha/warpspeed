"use client"

import { useState, useRef, useEffect } from "react"
import { GoogleGenAI } from "@google/genai"
import { SarvamAIClient } from "sarvamai"

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! })

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.NEXT_PUBLIC_SARVAM_AI_API_KEY!,
})

export default function SleepLearningDocumentSummarizer() {
  const [documents, setDocuments] = useState<FileList | null>(null)
  const [summary, setSummary] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null)
  const [timer, setTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [musicStarted, setMusicStarted] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const music = new Audio('/calm.mp3')
    music.loop = true
    music.volume = 0.2
    music.preload = 'auto'
    
    music.addEventListener('canplaythrough', () => {
      if (!musicStarted) {
        music.play().catch(e => {
          console.log('Auto-play blocked by browser, will start on user interaction')
        })
        setMusicStarted(true)
      }
    })
    
    music.addEventListener('error', (e) => {
      console.error('Background music loading error:', e)
    })
    
    setBackgroundMusic(music)

    return () => {
      if (music) {
        music.pause()
        music.src = ''
        music.removeEventListener('canplaythrough', () => {})
        music.removeEventListener('error', () => {})
      }
    }
  }, [musicStarted])

  const startMusicOnInteraction = () => {
    if (backgroundMusic && !musicStarted) {
      backgroundMusic.play().catch(e => console.error('Music play error:', e))
      setMusicStarted(true)
    }
  }

  useEffect(() => {
    if (isTimerActive && remainingTime > 0) {
      timerRef.current = setTimeout(() => {
        setRemainingTime(prev => prev - 1)
      }, 1000)
    } else if (remainingTime === 0 && isTimerActive) {
      setIsTimerActive(false)
      handlePlayAudio()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isTimerActive, remainingTime])

  const readDocumentContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        resolve(content)
      }
      reader.onerror = reject
      
      if (file.type === 'application/pdf') {
        reader.readAsText(file)
      } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        reader.readAsText(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    startMusicOnInteraction()
    const files = e.target.files
    setDocuments(files)
    
    if (files) {
      const fileNames = Array.from(files).map(file => file.name)
      setUploadedFiles(fileNames)
    } else {
      setUploadedFiles([])
    }
  }

  const generateSummary = async () => {
    startMusicOnInteraction()
    
    if (!documents || documents.length === 0) {
      alert("Please upload at least one document")
      return
    }

    setIsProcessing(true)
    setSummary("")

    try {
      let content = ""

      for (let i = 0; i < documents.length; i++) {
        const file = documents[i]
        const fileContent = await readDocumentContent(file)
        content += `Document ${i + 1} (${file.name}):\n${fileContent}\n\n`
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: `Please create a study summary of the following content, designed for sleep learning and audio revision. It will be read aloud while someone is resting or sleeping.

Format it as a calm, gentle spoken lecture:

Start with a soft welcome and context-setting introduction. Then present the key concepts slowly and clearly, using simple language. Repeat important ideas naturally for better retention. Use phrases like "Let's review", "Remember that", or "It's important to note" for smooth transitions. Break down complex ideas into small, digestible parts. Use analogies or mnemonics if helpful. Emphasize key terms by repeating them in different contexts.

Maintain a peaceful, soothing tone. Build the explanation logically from one concept to the next. End with a soft recap and words of encouragement to reinforce memory.

The entire summary should read like a comforting voice, not a textbook. Keep it under 1000 characters total. Avoid formatting, lists, or special characters—just smooth, continuous text.

Here is the content to summarize:

${content}
`,
      })

      const summaryText = response.text || ""
      setSummary(summaryText)

    } catch (error) {
      console.error("Error generating summary:", error)
      alert("Failed to generate summary. Please check your API key and try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlayAudio = async () => {
    startMusicOnInteraction()
    
    if (!summary) {
      alert("Please generate a summary first")
      return
    }

    setIsGeneratingAudio(true)
    setAudioUrl(null)

    try {
      const response = await client.textToSpeech.convert({
        text: summary,
        model: "bulbul:v2",
        speaker: "anushka",
        target_language_code: "en-IN",
      })

      if (!response.audios || response.audios.length === 0) {
        throw new Error("No audio data received")
      }
     
      const binary = atob(response.audios[0])
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: "audio/mp3" })
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)

      if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(e => console.error('Music play error:', e))
      }

      const audio = new Audio(url)
      audio.play()

    } catch (error) {
      console.error("TTS Error:", error)
      alert("Failed to generate audio. Please check your Sarvam AI API key.")
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const handleTimerStart = () => {
    startMusicOnInteraction()
    
    if (timer <= 0) {
      alert("Please set a valid timer duration")
      return
    }
    
    setRemainingTime(timer)
    setIsTimerActive(true)
  }

  const handleDownload = () => {
    if (!audioUrl) return
    const link = document.createElement("a")
    link.href = audioUrl
    link.download = "sleep-learning-summary.mp3"
    link.click()
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const clearFiles = () => {
    setDocuments(null)
    setUploadedFiles([])
    setSummary("")
    setAudioUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sleep Learning Document Summarizer
          </h1>
          <p className="text-lg text-gray-600">
            Transform your study materials into gentle sleep learning audio
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📚 Upload Your Study Documents</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Documents (Word, PDF, TXT, Markdown)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.md,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: .txt, .md, .doc, .docx, .pdf (Note: For best results with Word/PDF files, consider converting to plain text first)
            </p>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">📄 Uploaded Files:</h3>
              <ul className="space-y-1">
                {uploadedFiles.map((fileName, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {fileName}
                  </li>
                ))}
              </ul>
              <button
                onClick={clearFiles}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Clear all files
              </button>
            </div>
          )}
          <button
            onClick={generateSummary}
            disabled={isProcessing || !documents}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isProcessing || !documents
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
            }`}
          >
            {isProcessing ? "Creating Sleep Learning Summary..." : "🧠 Generate Sleep Learning Summary"}
          </button>
        </div>
        {summary && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">📝 Sleep Learning Summary</h2>
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-justify">
                {summary}
              </p>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
              <p className="text-sm text-indigo-700">
                💡 This summary is specially crafted for sleep learning. The content is structured for easy absorption during rest, 
                with repetition and gentle pacing to help your mind retain information while you sleep.
              </p>
            </div>
          </div>
        )}
        {summary && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">🎧 Sleep Learning Audio</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                ⏰ Sleep Timer (seconds) - Delay before audio starts
              </label>
              <div className="flex gap-4 items-center flex-wrap">
                <input
                  type="number"
                  value={timer}
                  onChange={(e) => setTimer(parseInt(e.target.value) || 0)}
                  min="0"
                  max="1800"
                  placeholder="e.g., 300 for 5 minutes"
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleTimerStart}
                  disabled={isTimerActive}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isTimerActive
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isTimerActive ? "Timer Active" : "Start Sleep Timer"}
                </button>
                {isTimerActive && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-lg font-bold text-green-600">
                      {formatTime(remainingTime)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayAudio}
                disabled={isGeneratingAudio}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  isGeneratingAudio
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isGeneratingAudio ? "Generating Audio..." : "🔊 Play Sleep Learning Audio"}
              </button>
              {audioUrl && (
                <button
                  onClick={handleDownload}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Download MP3
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

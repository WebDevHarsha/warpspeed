export interface Transcript {
  text: string
  duration: number
  offset: number
}

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
  interpretation: any
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onend: () => void
  start: () => void
  stop: () => void
}

export interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

export interface Window {
  SpeechRecognition: SpeechRecognitionConstructor
  webkitSpeechRecognition: SpeechRecognitionConstructor
}

export interface Message {
  role: "user" | "ai"
  content: string
  imageUrl?: string
}

export interface Expression {
  id: string
  latex: string
}

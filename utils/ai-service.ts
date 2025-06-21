"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"
import type { Message, Transcript } from "@/types"

const goog = process.env.GOOGLE ?? ""
const genAI = new GoogleGenerativeAI(goog)

export const generateAIResponse = async (
  input: string,
  conversation: Message[],
  fileContent: string,
  transcript: Transcript[],
) => {
  const transcriptText = transcript.map((t) => t.text).join(" ")
  const conversationHistory = conversation
    .map((msg) => `${msg.role === "user" ? "Human" : "AI"}: ${msg.content}`)
    .join("\n")

  const prompt = `
    Conversation history:
    ${conversationHistory}

    if there is something about who you created or built is specified below then say "I was built by The Vanguards" only if they ask, if not then dont mention this.
     You are a Socratic teacher.
    First answer the question that is asked in 5-6 lines and then Engage in a thoughtful dialogue with the user, asking questions one by one to help them discover knowledge on their own.
    The question is: ${input}
    ${fileContent ? `Consider this additional context from the uploaded document: ${fileContent}` : ""}
    ${transcriptText ? `Consider this as a transcript of a YouTube video: ${transcriptText}` : ""}
    Your response:
  `

  const response = await fetch("/api/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: prompt,
      query: input,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data from the API")
  }

  const data = await response.json()
  const generatedText = data.chatContent
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const image_prompt = `give a one word that can describe this sentence for image generation. remeber this sentence is using socratic method to teach so give the word for the content its trying to explain: ${generatedText}. the input given was :${input}`

  const result = await model.generateContent(image_prompt)
  const response1 = await fetch("/api/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: prompt,
      query: await result.response.text(),
    }),
  })

  if (!response1.ok) {
    console.error("Failed to fetch data from /api/getData", await response1.text())
    throw new Error("Failed to fetch data from /api/getData")
  }

  const data1 = await response1.json()
  const imageUrl = data1.imageUrl

  return { generatedText, imageUrl }
}

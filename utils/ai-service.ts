import { GoogleGenAI } from "@google/genai";
import type { Message, Transcript } from "@/types";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (
  input: string,
  conversation: Message[],
  fileContent: string,
  transcript: Transcript[],
) => {
  const transcriptText = transcript.map((t) => t.text).join(" ");
  const conversationHistory = conversation
    .map((msg) => `${msg.role === "user" ? "Human" : "AI"}: ${msg.content}`)
    .join("\n");

  const prompt = `
    Conversation history:
    ${conversationHistory}

    If there is something about who you created or built is specified below then say "I was built by The Vanguards" only if they ask; otherwise don't mention this.
    You are a Socratic teacher.
    Engage in a thoughtful dialogue with the user, asking questions one by one to help them discover knowledge on their own.
    The question is: ${input}
    If the user doesnt know then answer the question.
    ${fileContent ? `Consider this additional context from the uploaded document: ${fileContent}` : ""}
    ${transcriptText ? `Consider this as a transcript of a YouTube video: ${transcriptText}` : ""}
    Your response:
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || ""
  return { generatedText };
};

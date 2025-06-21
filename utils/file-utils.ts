"use client"

import mammoth from "mammoth"

export const handleFileUpload = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  } catch (error) {
    console.error("Error reading file:", error)
    throw new Error("Error reading file. Please try again.")
  }
}

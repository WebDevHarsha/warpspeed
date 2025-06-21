"use client";

import { useState } from "react";
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.NEXT_PUBLIC_SARVAM_AI_API_KEY!,
});

interface TextToSpeechPlayerProps {
  text: string;
}

export const TextToSpeechPlayer: React.FC<TextToSpeechPlayerProps> = ({ text }) => {
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    setLoading(true);
    try {
      const response = await client.textToSpeech.convert({
        text,
        model: "bulbul:v2",
        speaker: "anushka",
        target_language_code: "en-IN",
      });

      const audio = new Audio(`data:audio/mp3;base64,${response.audio}`);
      audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center gap-4">
      <p className="text-center text-gray-800 dark:text-gray-200 text-lg font-medium">
        {text}
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
    </div>
  );
};

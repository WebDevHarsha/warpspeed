import { TextToSpeechPlayer } from "@/components/SarvamAi";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-8">
      <TextToSpeechPlayer text="Welcome to Sarvam AI!" />
    </main>
  );
}

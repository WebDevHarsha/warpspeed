// app/transcript/page.tsx
'use client';

import { useState } from 'react';

export default function TranscriptPage() {
  const [videoId, setVideoId] = useState('');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTranscript = async () => {
    setLoading(true);
    setError('');
    setTranscript([]);
    try {
      const res = await fetch('/api/getTranscript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      const lines = data.transcript.map((entry: any) => entry.text);
      setTranscript(lines);
    } catch (err: any) {
      setError(err.message || 'Error fetching transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">YouTube Transcript Fetcher</h1>
      <input
        type="text"
        className="border p-2 w-full rounded mb-4"
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button
        onClick={fetchTranscript}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get Transcript'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {transcript.length > 0 && (
        <div className="mt-6 space-y-2">
          {transcript.map((line, index) => (
            <p key={index} className="text-gray-800">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

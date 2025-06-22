"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Brain, Lightbulb, RotateCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const FeynmanTutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you learn using the Feynman Technique. Choose a topic you want to understand better, and try explaining it to me in simple terms. I'll help correct you and guide you to deeper understanding. What topic would you like to work on?",
      isUser: false,
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#{1,6}\s+/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      .replace(/^\s*>\s+/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const generateAIResponse = async (userExplanation: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
      const ai = new GoogleGenAI({ apiKey });
      
      let prompt = "";
      
      if (!currentTopic) {
        prompt = `The user wants to learn about: "${userExplanation}". 
        
        Respond enthusiastically and ask them to explain this topic to you in their own words, as if they're teaching it to someone who has never heard of it before. Encourage them to start with whatever they understand, even if it's not perfect.
        
        Keep the response brief, encouraging, and focused on getting them to explain the concept. Do not use any markdown formatting like bold, italics, bullet points, or headers in your response.`;
      } else {
        prompt = `The user is trying to explain "${currentTopic}" using the Feynman Technique. 

        Their explanation: "${userExplanation}"

        You are a helpful learning coach. Your job is to:
        1. Acknowledge what they got right
        2. Gently correct any misconceptions or gaps
        3. Ask probing questions to help them think deeper
        4. Encourage them to explain unclear parts better
        5. Suggest analogies or simpler ways to explain complex parts

        Be encouraging, specific in your feedback, and help them identify what they might be missing. If their explanation is good, challenge them to go deeper or explain it in an even simpler way.

        Keep your response conversational and supportive. Do not use any markdown formatting like bold, italics, bullet points, or headers in your response.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const rawResponse = response.text || "I'm having trouble processing that. Could you try explaining it again?";
      return stripMarkdown(rawResponse);
      
    } catch (error) {
      console.error('Error calling Google GenAI:', error);
      return "I'm having trouble connecting to my AI brain right now. Please try again in a moment!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (!currentTopic) {
      setCurrentTopic(inputValue.trim());
    }

    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again!",
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm here to help you learn using the Feynman Technique. Choose a topic you want to understand better, and try explaining it to me in simple terms. I'll help correct you and guide you to deeper understanding. What topic would you like to work on?",
        isUser: false,
      }
    ]);
    setCurrentTopic('');
  };

  const getStageIcon = () => null;

  const getStageLabel = () => '';

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Feynman AI Tutor</h1>
              <p className="text-sm text-gray-600">Learn anything through simple explanations</p>
            </div>
          </div>
          <button
            onClick={resetConversation}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>
      </div>

      {currentTopic && (
        <div className="bg-white/50 backdrop-blur-sm border-b p-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">Current Topic:</span>
              <span className="text-sm font-semibold text-indigo-600 capitalize">{currentTopic}</span>
            </div>
            <div className="text-sm text-gray-500">
              Explain it to me in your own words
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-sm border px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                !currentTopic 
                  ? "What topic would you like to learn? (e.g., 'photosynthesis', 'blockchain', 'gravity')"
                  : "Explain the topic to me in your own words..."
              }
              className="flex-1 text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-t p-3">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-xs text-gray-600">
              💡 <strong>Feynman Technique:</strong> Explain concepts in simple terms • Identify gaps in understanding • Get feedback and corrections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeynmanTutor;
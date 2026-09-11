'use client';

import { useState, useRef, useEffect } from 'react';
import { MOCK_CHAT_RESPONSES, QUICK_CHAT_PROMPTS } from '@/lib/mockData';
import { audioEngine } from '@/lib/audioHelper';
import { Send, Sparkles, User, Bot, Volume2, MessageSquare } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 'msg-0',
      sender: 'jothishyan',
      text: 'Kai nokki kazhinju! Ini enthaariyenda... chodikkeda mone! Love life, Job, Cash, Fortune, all questions welcomed.',
      audioText: 'Kai nokki kazhinju! Ini enthaariyenda... chodikkeda mone!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (questionText = null) => {
    const textToSend = questionText || input;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsTyping(true);

    // Simulate AI Jothishyan Response
    setTimeout(() => {
      let replyText = '';
      const q = textToSend.toLowerCase();

      if (q.includes('love') || q.includes('crush') || q.includes('relationship')) {
        replyText = MOCK_CHAT_RESPONSES.love[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.love.length)];
      } else if (q.includes('job') || q.includes('work') || q.includes('career') || q.includes('salary')) {
        replyText = MOCK_CHAT_RESPONSES.job[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.job.length)];
      } else if (q.includes('foreign') || q.includes('visa') || q.includes('abroad') || q.includes('travel')) {
        replyText = MOCK_CHAT_RESPONSES.foreign[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.foreign.length)];
      } else if (q.includes('overthink') || q.includes('mind') || q.includes('thought')) {
        replyText = MOCK_CHAT_RESPONSES.overthinking[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.overthinking.length)];
      } else {
        replyText = MOCK_CHAT_RESPONSES.generic[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.generic.length)];
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'jothishyan',
        text: replyText,
        audioText: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Trigger automatic TTS voice playback
      audioEngine.speak(replyText);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card-purple rounded-3xl border border-purple-500/40 shadow-2xl flex flex-col h-[75vh] max-h-[700px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-purple-900/40 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-lg">
                🔮
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-gold-glow flex items-center gap-2">
              ASK THE JOTHISHYAN
            </h3>
            <p className="text-[11px] text-slate-400">AI Malayalam Fortune Chat Bot</p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
          VOICE TTS ONLINE
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border ${
                msg.sender === 'user'
                  ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                  : 'bg-purple-950 border-purple-500/40 text-amber-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : '🔮'}
            </div>

            {/* Bubble */}
            <div>
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-950 to-slate-900 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                    : 'bg-slate-950/90 border border-purple-500/35 text-slate-100 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                {msg.sender === 'jothishyan' && (
                  <button
                    onClick={() => audioEngine.speak(msg.audioText)}
                    className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 font-mono bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/30 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Speak Response
                  </button>
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-amber-300 font-mono bg-slate-950/80 px-4 py-2 rounded-xl border border-purple-500/30 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            Jothishyan is consulting planetary matrix...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/50 border-t border-purple-900/30 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] text-purple-300 font-mono shrink-0">Prompts:</span>
        {QUICK_CHAT_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[11px] whitespace-nowrap bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 hover:border-amber-400/60 text-slate-300 px-3 py-1 rounded-full transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 border-t border-purple-900/40 bg-slate-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something... (e.g. Ente love life engane aanu?)"
            className="flex-1 bg-slate-900 border border-purple-500/30 focus:border-amber-400 text-slate-100 text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:opacity-50 text-slate-950 font-bold p-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

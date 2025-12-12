
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatPageProps {
  onBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好！我是 AURA BOT。今天有什麼可以協助您的嗎？' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(inputText);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
            <button 
                onClick={onBack}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-tr from-primary to-accent rounded-lg text-white">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">健康助理</h3>
                    <p className="text-xs text-slate-500 flex items-center">
                        <Sparkles size={10} className="mr-1 text-accent" /> Powered by Gemini
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                    {msg.text}
                </div>
            </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center">
                    <Loader2 size={16} className="animate-spin text-slate-400 mr-2" />
                    <span className="text-xs text-slate-400">思考中...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100 pb-safe">
        <div className="flex items-center space-x-2">
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="輸入訊息..." 
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

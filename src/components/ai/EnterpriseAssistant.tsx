import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, User, X, Maximize2, Zap, Terminal, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const EnterpriseAssistant = () => {
  const { currentPage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `System online. Authentication verified. I am currently synced with the ${currentPage} workspace. How can I assist you with this context?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Analyzing query "${userMessage}" against ${currentPage} telemetry...\n\nNo anomalies detected in the current operating bounds. I have temporarily filtered out unnecessary background noise. Would you like me to run a deeper diagnostic or isolate a specific entity?` 
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            drag
            dragMomentum={false}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-[280px] bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors z-50 cursor-grab active:cursor-grabbing"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-[280px] w-96 h-[600px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans"
          >
            <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center justify-between drag-handle cursor-grab active:cursor-grabbing">
              <div className="flex items-center space-x-2">
                <GripHorizontal size={16} className="text-gray-500 mr-1" />
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Terminal className="text-blue-500" size={16} />
                </div>
                <div>
                  <h3 className="text-white font-semibold flex items-center text-sm">
                    Nexus AI <Zap size={12} className="text-yellow-500 ml-1" />
                  </h3>
                  <p className="text-[10px] text-green-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> Context: {currentPage}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 text-gray-400">
                <button className="hover:text-white transition-colors"><Maximize2 size={16} /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors"><X size={16} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl p-3 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-900 border border-gray-800 text-gray-300 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="flex items-center mb-1 space-x-2">
                      {msg.role === 'assistant' ? (
                        <Bot size={14} className="text-blue-400" />
                      ) : (
                        <User size={14} className="text-gray-300" />
                      )}
                      <span className="text-[10px] opacity-75 font-medium uppercase tracking-wider">
                        {msg.role === 'assistant' ? 'Nexus' : 'Operator'}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-light mt-1">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-900 border-t border-gray-800">
              <form onSubmit={handleSend} className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask Nexus about ${currentPage}...`} 
                  className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400 p-2 disabled:opacity-50"
                >
                  <MessageSquare size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnterpriseAssistant;

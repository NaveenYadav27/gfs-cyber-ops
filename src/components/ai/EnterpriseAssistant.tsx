import React, { useState } from 'react';
import { MessageSquare, Bot, User, X, Maximize2, Zap, Terminal } from 'lucide-react';

const EnterpriseAssistant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'System online. Authentication verified. How can I assist you with enterprise intelligence today?' },
    { role: 'user', content: 'What happens if WEB-01 fails?' },
    { role: 'assistant', content: 'Analyzing dependency graph for WEB-01...\n\nIf WEB-01 fails:\n1. Traffic will failover to WEB-02 and WEB-03 via the primary load balancer.\n2. User sessions may experience a sub-500ms latency spike during reconnection.\n3. Background job queues on WEB-01 will be automatically re-assigned by the orchestrator.\n\nRisk Assessment: Low business impact. Would you like me to simulate this failure in the staging environment?' },
    { role: 'user', content: 'No, but show me the financial exposure if the entire web cluster goes down.' },
    { role: 'assistant', content: 'Calculating exposure for complete Web Cluster failure...\n\nEstimated downtime cost: ~$45,000 per minute.\nSLA penalties trigger after 5 minutes of total unavailability, adding a potential $2.1M liability if outage exceeds 1 hour.\n\nRecommendation: Increase cross-region redundancy for the web tier. Shall I draft the infrastructure proposal?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Processing query via Enterprise Knowledge Graph... [Demo Mode]' }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-[280px] bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 z-50"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-[280px] w-96 h-[600px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans">
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <Terminal className="text-blue-500" size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center">
              Nexus AI <Zap size={14} className="text-yellow-500 ml-1" />
            </h3>
            <p className="text-xs text-green-400 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <div className="flex space-x-2 text-gray-400">
          <button className="hover:text-white transition-colors"><Maximize2 size={18} /></button>
          <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors"><X size={18} /></button>
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
                <span className="text-xs opacity-75 font-medium">
                  {msg.role === 'assistant' ? 'Nexus' : 'Executive'}
                </span>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-light mt-1">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about enterprise health, risks..." 
            className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400 p-2"
          >
            <MessageSquare size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterpriseAssistant;

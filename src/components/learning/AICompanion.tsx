// src/components/learning/AICompanion.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, GripHorizontal } from 'lucide-react';
import { useLearningEngine } from '@/store/useLearningEngine';

const SUGGESTED_PROMPTS = [
  'Analyze my current view',
  'What should I investigate?',
  'Explain the logs',
];

export function AICompanion() {
  const { showAI, toggleAI, aiConversations, addAIConversation, currentMissionId } = useLearningEngine();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiConversations]);

  const handleSend = (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    addAIConversation({ role: 'user', content: message });
    setInput('');

    setTimeout(() => {
      const contextStr = currentMissionId ? `mission ${currentMissionId}` : 'the global platform';
      addAIConversation({ 
        role: 'mentor', 
        content: `Analyzing "${message}" within the context of ${contextStr}...\n\nBased on your current telemetry, no immediate anomalies are flagged. I am standing by to assist with specific log queries or threat intel analysis as required.`
      });
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {!showAI && (
          <motion.button
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAI}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center shadow-lg z-50 cursor-grab active:cursor-grabbing"
            style={{ boxShadow: '0 4px 20px rgba(0,229,199,0.3)' }}
          >
            <MessageSquare className="w-5 h-5 text-[var(--color-gfs-base)]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAI && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border-light)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)] flex items-center gap-3 drag-handle cursor-grab active:cursor-grabbing">
              <GripHorizontal size={16} className="text-gray-500 mr-1" />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--color-gfs-base)]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--color-gfs-text)]">SOC Mentor</div>
                <div className="text-[10px] text-[var(--color-gfs-accent)]">AI Learning Companion</div>
              </div>
              <button onClick={toggleAI} className="ml-auto">
                <X className="w-4 h-4 text-[var(--color-gfs-text-muted)] hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {aiConversations.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
                  <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Your AI mentor is ready. How can I assist you with your current task?</p>
                </div>
              )}
              {aiConversations.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'mentor' && (
                    <div className="w-6 h-6 rounded bg-[var(--color-gfs-accent-dim)] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-[var(--color-gfs-accent)]" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-xl text-[11px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-text)]'
                      : 'bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-secondary)]'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {aiConversations.length === 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button key={prompt} onClick={() => handleSend(prompt)}
                    className="px-2 py-1 rounded-lg bg-[var(--color-gfs-elevated)] text-[10px] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] transition-colors">
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--color-gfs-border-light)]">
              <div className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your mentor..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] transition-colors" />
                <button onClick={() => handleSend()} disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-[var(--color-gfs-accent-dim)] flex items-center justify-center text-[var(--color-gfs-accent)] hover:bg-[var(--color-gfs-accent)]/20 transition-colors disabled:opacity-30">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

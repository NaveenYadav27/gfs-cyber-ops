import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, User, AlertTriangle, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';

export function InternalMessaging() {
  const { messages, markMessageRead } = useStore();
  const [selectedMessage, setSelectedMessage] = useState(messages.find(m => !m.read) || messages[0]);
  const unread = messages.filter(m => !m.read).length;

  const selectMessage = (msg: typeof messages[0]) => {
    setSelectedMessage(msg);
    if (!msg.read) markMessageRead(msg.id);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Mail className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="GFS Internal Mail"
        subtitle="Secure internal messaging — Cybersecurity Division"
        badge={unread > 0 ? <Badge variant="critical" pulse>{unread} Unread</Badge> : undefined}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Message List */}
        <Card delay={0.05} className="!p-0 overflow-hidden max-h-[600px] overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              onClick={() => selectMessage(msg)}
              className={`px-4 py-3 border-b border-[var(--color-gfs-border-light)] cursor-pointer transition-colors ${
                selectedMessage?.id === msg.id ? 'bg-[var(--color-gfs-accent-dim)]' : 'hover:bg-[var(--color-gfs-hover)]'
              } ${!msg.read ? 'border-l-2 border-l-[var(--color-gfs-accent)]' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{msg.from}</span>
                {msg.priority === 'urgent' && <Badge variant="critical">URGENT</Badge>}
                {msg.priority === 'high' && <Badge variant="high">HIGH</Badge>}
              </div>
              <p className={`text-xs truncate ${!msg.read ? 'text-[var(--color-gfs-text)] font-medium' : 'text-[var(--color-gfs-text-secondary)]'}`}>
                {msg.subject}
              </p>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </Card>

        {/* Message Detail */}
        <Card delay={0.1} className="xl:col-span-2 !p-6 max-h-[600px] overflow-y-auto">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-[var(--color-gfs-border-light)]">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-gfs-base)]">{selectedMessage.from.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-gfs-text)]">{selectedMessage.from}</span>
                    {selectedMessage.priority === 'urgent' && <Badge variant="critical">URGENT</Badge>}
                  </div>
                  <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{selectedMessage.fromRole}</div>
                  <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">
                    To: {selectedMessage.to} • {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">{selectedMessage.subject}</h3>
              <div className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed whitespace-pre-line">
                {selectedMessage.body}
              </div>
              <div className="pt-4 border-t border-[var(--color-gfs-border-light)]">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] text-xs">
                    <Send className="w-3 h-3" /> Reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--color-gfs-text-muted)]">
              <Mail className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

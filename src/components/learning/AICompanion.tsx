// src/components/learning/AICompanion.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Lightbulb, HelpCircle, Search, FileText } from 'lucide-react';
import { useLearningEngine } from '@/store/useLearningEngine';

const SUGGESTED_PROMPTS = [
  'Explain what DNS tunneling is',
  'What is the difference between SIEM and EDR?',
  'How does UPI fraud work?',
  'What should I look for in this log?',
  'Help me understand MITRE ATT&CK T1566',
  'What are the RBI reporting requirements?',
  'How do I write a KQL query?',
  'What is the kill chain for this attack?',
];

function generateMentorResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('dns tunnel')) {
    return `DNS tunneling is a technique where attackers encode data within DNS queries and responses. Since DNS traffic is rarely inspected deeply, it creates a covert channel for:\n\n• Command & Control (C2) communication\n• Data exfiltration\n• Keeping persistent access\n\nAt GFS, we detected this in the Treasury workstation (ALT-2025-9006). Look for:\n- High-entropy DNS query names (base32/base64 encoded)\n- Unusually high volume of TXT record queries\n- Queries to recently registered domains\n\nThe Palo Alto firewall flags this automatically when entropy exceeds 3.5. Want me to show you a KQL query to detect this in Sentinel?`;
  }

  if (lower.includes('upi fraud') || lower.includes('how does upi fraud')) {
    return `UPI fraud at GFS typically follows this pattern:\n\n1. Fraud ring creates mule account network (multiple VPAs)\n2. They provision a merchant terminal with incomplete KYC\n3. Automated scripts execute hundreds of small transactions\n4. Money moves through mule accounts rapidly\n5. Funds withdrawn before detection\n\nAt GFS, we detected this in Mission 1 — 847 transactions worth ₹2.4 crore in 28 minutes.\n\nKey detection signals:\n- Transaction velocity exceeding baseline\n- New merchant with no history\n- Distribution across multiple payment banks\n- FIU-IND mule account intelligence match\n\nThe RBI requires reporting within 6 hours. What would you like to explore next?`;
  }

  if (lower.includes('kql') || lower.includes('kusto')) {
    return `KQL (Kusto Query Language) is your primary tool for investigating alerts in Sentinel. Here are the most common patterns:\n\n**Filter and Count:**\n\`\`\`\nSecurityAlert | where TimeGenerated > ago(1h)\n| summarize count() by AlertName\n| order by count_ desc\n\`\`\`\n\n**Look for specific IPs:**\n\`\`\`\nSecurityEvent | where IpAddress == "10.0.45.117"\n| project TimeGenerated, EventID, Message\n| order by TimeGenerated desc\n\`\`\`\n\n**Join tables for correlation:**\n\`\`\`\nSecurityAlert | join kind=inner SecurityEvent\non Computer\n\`\`\`\n\nThe key is to start with 'what do I need to find?' then build the query. Want me to help you with a specific investigation query?`;
  }

  if (lower.includes('mitre') || lower.includes('t1566') || lower.includes('att&ck')) {
    return `MITRE ATT&CK maps adversary behavior to specific techniques. Let me explain T1566 (Phishing):\n\n**T1566 — Phishing**\nTactic: Initial Access\n\nThis is how attackers gain their first foothold. Common sub-techniques:\n- T1566.001: Spearphishing Attachment (malicious files)\n- T1566.002: Spearphishing Link (malicious URLs)\n\nAt GFS, we see this in:\n- Mission 2: PowerShell payload via email attachment\n- ALT-2025-9004: Fake IT Security email\n\n**Why it matters:** Every incident starts with initial access. If we detect phishing early, we prevent everything that follows.\n\n**Detection:**\n- Email authentication (DMARC/DKIM)\n- Attachment sandboxing (Defender for O365)\n- User reporting habits\n\nWant to explore another technique?`;
  }

  if (lower.includes('rbi') || lower.includes('regulatory') || lower.includes('reporting')) {
    return `GFS must comply with multiple Indian regulatory frameworks:\n\n**RBI Cyber Incident Reporting (2022)**\n- Critical incidents: Report within 6 hours\n- Format: Prescribed RBI template\n- Channel: RBI Cyber Security Portal\n\n**CERT-In Guidelines (2022)**\n- 6-hour reporting for significant incidents\n- 2-hour reporting for targeted attacks\n- Must include: nature, impact, remediation\n\n**IT Act 2000 Section 43A**\n- Mandatory data breach notification\n- Notify affected data principals\n- Compensation for negligence\n\n**PCI DSS**\n- Reportable events within 24 hours\n- Annual compliance audit\n\n**NPCI (for UPI)**\n- Immediate notification for payment fraud\n- Transaction reversal coordination\n\nAs a SOC analyst, you need to know these timelines. The SOC escalation process ensures timely reporting.`;
  }

  if (lower.includes('siem') && lower.includes('edr')) {
    return `Great question — understanding the difference is fundamental:\n\n**SIEM (Sentinel at GFS)**\n• Collects logs FROM everywhere\n• Sees network traffic, firewall logs, cloud events\n• Correlates across multiple sources\n• Detects patterns over time\n• Like a CCTV system for the whole network\n\n**EDR (Falcon at GFS)**\n• Monitors individual endpoints (laptops, servers)\n• Sees process execution, file changes, memory\n• Can kill processes and isolate machines\n• Detects malware behavior in real-time\n• Like a bodyguard for each computer\n\n**How they work together:**\n1. Falcon detects malware on an endpoint → alert\n2. Sentinel correlates that alert with firewall logs, AD logs, etc.\n3. Together they give you the full picture\n\nAt GFS, Falcon protects 42,100 endpoints and Sentinel ingests 3.2TB daily from 14,200 sources. Both are critical.`;
  }

  // Default response
  return `That is a great question. Let me help you think through it.\n\nIn the context of GFS and your current missions, here is what I would suggest:\n\n1. **Start with the business context** — Why does this matter to GFS?\n2. **Look at the architecture** — Which systems are involved?\n3. **Examine the evidence** — What do the logs tell you?\n4. **Map to MITRE** — What technique is the attacker using?\n5. **Make a decision** — What is the right action?\n\nTry asking me about a specific topic:\n- DNS tunneling\n- UPI fraud patterns\n- KQL query writing\n- MITRE ATT&CK techniques\n- RBI reporting requirements\n- SIEM vs EDR\n\nI am here to guide you, not give you answers. What would you like to explore?`;
}

export function AICompanion() {
  const { showAI, toggleAI, aiConversations, addAIConversation } = useLearningEngine();
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
      const response = generateMentorResponse(message);
      addAIConversation({ role: 'mentor', content: response });
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAI}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center shadow-lg z-50"
        style={{ boxShadow: '0 4px 20px rgba(0,229,199,0.3)' }}
      >
        {showAI ? <X className="w-5 h-5 text-[var(--color-gfs-base)]" /> : <MessageSquare className="w-5 h-5 text-[var(--color-gfs-base)]" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border-light)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--color-gfs-base)]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--color-gfs-text)]">SOC Mentor</div>
                <div className="text-[10px] text-[var(--color-gfs-accent)]">AI Learning Companion</div>
              </div>
              <button onClick={toggleAI} className="ml-auto">
                <X className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {aiConversations.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
                  <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Your AI mentor is ready to help. Ask about any concept, log analysis, or investigation technique.</p>
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
                {SUGGESTED_PROMPTS.slice(0, 4).map((prompt) => (
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

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

export function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { cmd: '', output: 'GFS CyberOps Interactive Terminal\\nType "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      let output = '';
      
      switch (cmd.toLowerCase()) {
        case 'help': output = 'Available commands:\\n- nmap [target]\\n- whoami\\n- clear'; break;
        case 'whoami': output = 'root'; break;
        case 'clear': setHistory([]); setInput(''); return;
        default: 
          if (cmd.startsWith('nmap')) {
            output = 'Starting Nmap 7.93 ( https://nmap.org )\\nNmap scan report for target\\nHost is up (0.042s latency).\\nNot shown: 998 closed tcp ports (reset)\\nPORT   STATE SERVICE\\n22/tcp open  ssh\\n80/tcp open  http\\n\\nNmap done: 1 IP address (1 host up) scanned in 1.45 seconds';
          } else {
            output = `Command not found: ${cmd}`;
          }
      }
      
      setHistory(prev => [...prev, { cmd, output }]);
      setInput('');
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader 
        icon={<TerminalIcon className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Interactive Terminal"
        subtitle="Global command line interface for offensive tooling."
      />
      <div className="flex-1 bg-[#0d1117] rounded-xl border border-[var(--color-gfs-border-light)] p-4 font-mono text-sm text-[var(--color-gfs-green)] overflow-y-auto">
        {history.map((h, i) => (
          <div key={i} className="mb-4">
            {h.cmd && <div className="text-white"><span className="text-[var(--color-gfs-accent)]">root@kali</span>:<span className="text-[var(--color-gfs-text-muted)]">~</span># {h.cmd}</div>}
            <pre className="mt-1 whitespace-pre-wrap">{h.output}</pre>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-[var(--color-gfs-accent)] mr-1">root@kali</span>:<span className="text-[var(--color-gfs-text-muted)] mr-2">~</span>#
          <input
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white ml-2"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

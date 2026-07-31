import { useState } from 'react';
import { BookOpen, Search, Shield, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

interface KBArticle {
  id: string;
  title: string;
  category: string;
  severity: string;
  mitreIds: string[];
  summary: string;
}

const KB_ARTICLES: KBArticle[] = [
  {
    id: 'KB-001', title: 'Ransomware — Detection, Investigation & Response', category: 'Endpoint Security', severity: 'critical',
    mitreIds: ['T1486', 'T1490', 'T1489'],
    summary: 'Ransomware encrypts files and systems. This covers how to detect early signs and respond.'
  },
  {
    id: 'KB-002', title: 'Phishing — Triage and Containment', category: 'Email Security', severity: 'high',
    mitreIds: ['T1566', 'T1059'],
    summary: 'Procedures for investigating reported phishing emails and containing them across the enterprise.'
  }
];

export function SOCKnowledgeBase() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="space-y-4">
      <PageHeader 
        icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />} 
        title="Knowledge Base" 
        subtitle="Standard Operating Procedures & Playbooks" 
      />

      <div className="relative mb-6">
        <Search className="w-4 h-4 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search knowledge base articles, TTPs, or procedures..."
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {KB_ARTICLES.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map((article, idx) => (
          <Card key={article.id} delay={0.1 * idx} hover className="!p-4 cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--color-gfs-accent)]" />
                <h3 className="text-sm font-bold text-[var(--color-gfs-text)]">{article.title}</h3>
                <Badge variant={article.severity === 'critical' ? 'critical' : 'high'}>{article.severity}</Badge>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />
            </div>
            <p className="text-xs text-[var(--color-gfs-text-muted)] mb-3">{article.summary}</p>
            <div className="flex items-center gap-3">
              <Badge variant="default">{article.category}</Badge>
              <div className="flex gap-1">
                {article.mitreIds.map(id => <Badge key={id} variant="accent">{id}</Badge>)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

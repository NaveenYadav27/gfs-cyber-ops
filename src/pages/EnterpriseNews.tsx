import { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, AlertTriangle, Clock, Shield, Users, Monitor, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ENTERPRISE_NEWS } from '@/data/enterprise-organization';

const categoryIcons: Record<string, React.ElementType> = {
  security: Shield, operations: Monitor, hr: Users, compliance: CheckCircle2,
  technology: Monitor, general: Newspaper,
};

const categoryColors: Record<string, string> = {
  security: 'var(--color-gfs-red)', operations: 'var(--color-gfs-blue)',
  hr: 'var(--color-gfs-green)', compliance: 'var(--color-gfs-amber)',
  technology: 'var(--color-gfs-purple)', general: 'var(--color-gfs-text-muted)',
};

export function EnterpriseNews() {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', ...new Set(ENTERPRISE_NEWS.map((n) => n.category))];
  const filtered = filter === 'all' ? ENTERPRISE_NEWS : ENTERPRISE_NEWS.filter((n) => n.category === filter);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Newspaper className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Enterprise News"
        subtitle="GFS Internal Portal — Company updates and security advisories"
      />

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-[11px] capitalize transition-colors ${
              filter === cat ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((news, i) => {
          const Icon = categoryIcons[news.category] || Newspaper;
          return (
            <motion.div key={news.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card delay={0} className={`!p-4 ${news.priority === 'critical' ? 'border-[var(--color-gfs-red)]/30 gfs-glow-red' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${categoryColors[news.category]}15` }}>
                    <Icon className="w-4 h-4" style={{ color: categoryColors[news.category] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={news.priority === 'critical' ? 'critical' : news.priority === 'high' ? 'high' : 'default'}>
                        {news.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="default">{news.category}</Badge>
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono ml-auto">
                        {new Date(news.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{news.title}</h4>
                    <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">{news.summary}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Source: {news.source}</span>
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Impact: {news.impact}</span>
                    </div>
                    {news.relatedAlerts && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {news.relatedAlerts.map((a) => <Badge key={a} variant="critical">{a}</Badge>)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

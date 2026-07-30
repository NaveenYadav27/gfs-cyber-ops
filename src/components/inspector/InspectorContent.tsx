import { Badge } from '@/components/ui/Badge';
import { RelationshipExplorer } from '@/components/ui/RelationshipExplorer';
import { Timeline } from '@/components/ui/Timeline';

/* ── Overview Section ── */
export function InspectorOverview({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-2">
      {Object.entries(data).filter(([k]) => ['ip', 'location', 'owner', 'status', 'criticality', 'os', 'type'].includes(k)).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between text-[11px]">
          <span className="text-[var(--color-gfs-text-muted)] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
          {typeof value === 'string' ? (
            <span className="text-[var(--color-gfs-text)]">{value as string}</span>
          ) : (
            <Badge variant="default">{String(value)}</Badge>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Business Purpose Section ── */
export function InspectorBusiness({ purpose, impact, sla }: { purpose: string; impact?: string; sla?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{purpose}</p>
      {impact && (
        <div className="p-2 rounded bg-[var(--color-gfs-amber-dim)] text-[10px] text-[var(--color-gfs-amber)]">
          <span className="font-semibold">Business Impact: </span>{impact}
        </div>
      )}
      {sla && (
        <div className="text-[10px] text-[var(--color-gfs-text-muted)]">SLA: {sla}</div>
      )}
    </div>
  );
}

/* ── Security Controls Section ── */
export function InspectorSecurityControls({ controls }: { controls: { name: string; status: 'active' | 'inactive' | 'warning' }[] }) {
  return (
    <div className="space-y-1">
      {controls.map((c) => (
        <div key={c.name} className="flex items-center justify-between text-[11px] py-1">
          <span className="text-[var(--color-gfs-text-secondary)]">{c.name}</span>
          <Badge variant={c.status === 'active' ? 'success' : c.status === 'warning' ? 'medium' : 'default'}>{c.status}</Badge>
        </div>
      ))}
    </div>
  );
}

/* ── Threats Section ── */
export function InspectorThreats({ threats }: { threats: { name: string; severity: string; mitre: string }[] }) {
  return (
    <div className="space-y-1.5">
      {threats.map((t) => (
        <div key={t.name} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--color-gfs-text)]">{t.name}</span>
            <Badge variant={t.severity === 'critical' ? 'critical' : 'high'}>{t.severity}</Badge>
          </div>
          <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{t.mitre}</div>
        </div>
      ))}
    </div>
  );
}

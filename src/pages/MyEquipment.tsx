import { motion } from 'framer-motion';
import { Laptop, Key, Smartphone, Shield, CheckCircle2, Package } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { MY_EQUIPMENT } from '@/data/enterprise-organization';

export function MyEquipment() {
  const activeCount = MY_EQUIPMENT.filter((e) => e.status === 'active').length;

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Package className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="My Equipment"
        subtitle={`All enterprise assets assigned to you — ${activeCount} active`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {MY_EQUIPMENT.map((eq, i) => (
          <motion.div key={eq.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="!p-4 h-full">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{eq.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{eq.name}</h4>
                    <Badge variant={eq.status === 'active' ? 'success' : 'default'}>{eq.status}</Badge>
                  </div>
                  <p className="text-[10px] text-[var(--color-gfs-accent)] font-mono mt-0.5">{eq.details}</p>
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{eq.description}</p>
              {eq.serialNumber && (
                <div className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)]">
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{eq.serialNumber}</span>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

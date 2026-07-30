import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Coffee, Briefcase, GraduationCap, PenTool, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { DAILY_SCHEDULE } from '@/data/enterprise-organization';

const typeConfig: Record<string, { color: string; icon: React.ElementType }> = {
  meeting: { color: 'var(--color-gfs-blue)', icon: Users },
  work: { color: 'var(--color-gfs-accent)', icon: Briefcase },
  training: { color: 'var(--color-gfs-purple)', icon: GraduationCap },
  break: { color: 'var(--color-gfs-green)', icon: Coffee },
  review: { color: 'var(--color-gfs-amber)', icon: PenTool },
};

export function DailySchedule() {
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Clock className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Daily Schedule"
        subtitle="Your workday at GFS Hyderabad SOC — Day Shift (06:00-14:00 IST)"
      />

      <Card delay={0} className="!p-3">
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-gfs-text-muted)]">
          <Clock className="w-3 h-3" />
          <span>Current Time: {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST</span>
          <span>•</span>
          <span>Shift: Day (06:00-14:00)</span>
          <span>•</span>
          <span>Location: Hyderabad SOC — Tower B, Floor 12</span>
        </div>
      </Card>

      <div className="space-y-2">
        {DAILY_SCHEDULE.map((item, i) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const itemHour = parseInt(item.time.split(':')[0]);
          const isCurrent = currentHour >= itemHour && currentHour < parseInt(item.endTime.split(':')[0]);

          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className={`!p-4 ${isCurrent ? 'border-[var(--color-gfs-accent)]/30 gfs-glow' : ''}`}>
                <div className="flex items-start gap-4">
                  {/* Time */}
                  <div className="text-right flex-shrink-0 w-16">
                    <div className="text-sm font-mono font-semibold text-[var(--color-gfs-text)]">{item.time}</div>
                    <div className="text-[10px] text-[var(--color-gfs-text-muted)]">to {item.endTime}</div>
                    {isCurrent && <Badge variant="accent" className="mt-1">NOW</Badge>}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${config.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{item.title}</h4>
                      {item.recurring && <Badge variant="default">Daily</Badge>}
                    </div>
                    <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1">{item.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" /> {item.location}
                      </span>
                      {item.attendees && (
                        <span className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" /> {item.attendees.join(', ')}
                        </span>
                      )}
                    </div>
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

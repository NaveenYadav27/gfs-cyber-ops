import { Globe, Building2, Users, TrendingUp, MapPin, Award, Calendar, Target, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { BUSINESS_UNITS } from '@/data/enterprise';

const COMPANY_STATS = [
  { label: 'Founded', value: '1996', icon: Calendar },
  { label: 'Employees', value: '48,000+', icon: Users },
  { label: 'Branches', value: '1,200+', icon: Building2 },
  { label: 'ATMs', value: '18,500+', icon: Globe },
  { label: 'Customers', value: '75 Million+', icon: Users },
  { label: 'Countries', value: '12', icon: Globe },
  { label: 'AUM', value: '₹2.4 Lakh Cr', icon: TrendingUp },
  { label: 'Revenue', value: '₹47,200 Cr', icon: TrendingUp },
  { label: 'Technology Centers', value: '5', icon: Server },
];

import { Server } from 'lucide-react';

const GLOBAL_LOCATIONS = [
  { city: 'Amaravati', country: 'India', role: 'Global HQ', employees: 8500, type: 'headquarters' },
  { city: 'Hyderabad', country: 'India', role: 'Primary DC + SOC', employees: 12000, type: 'datacenter' },
  { city: 'Mumbai', country: 'India', role: 'DR + Treasury', employees: 6500, type: 'datacenter' },
  { city: 'Bengaluru', country: 'India', role: 'Technology Center', employees: 8200, type: 'office' },
  { city: 'Pune', country: 'India', role: 'Technology Center', employees: 4800, type: 'office' },
  { city: 'Chennai', country: 'India', role: 'Technology Center', employees: 3200, type: 'office' },
  { city: 'Visakhapatnam', country: 'India', role: 'Operations Center', employees: 2100, type: 'office' },
  { city: 'Singapore', country: 'Singapore', role: 'APAC Hub', employees: 850, type: 'international' },
  { city: 'Dubai', country: 'UAE', role: 'Middle East Hub', employees: 420, type: 'international' },
  { city: 'London', country: 'UK', role: 'Europe Hub', employees: 380, type: 'international' },
  { city: 'New York', country: 'USA', role: 'North America Hub', employees: 320, type: 'international' },
];

const MILESTONES = [
  { year: '1996', event: 'GFS founded in Amaravati with 3 branches' },
  { year: '2003', event: 'Internet banking launched' },
  { year: '2008', event: 'Crossed 10 million customers' },
  { year: '2012', event: 'SOC established in Hyderabad — 24/7 operations begin' },
  { year: '2015', event: 'Mobile banking app launched — #1 rated in India within 6 months' },
  { year: '2017', event: 'Azure cloud migration began' },
  { year: '2019', event: '50 million customers milestone' },
  { year: '2020', event: 'UPI processed 1 billion transactions' },
  { year: '2022', event: 'Zero Trust architecture initiative launched' },
  { year: '2023', event: '75 million customers. SOC modernized with Sentinel + Falcon' },
  { year: '2024', event: 'AI-powered fraud detection deployed. ISO 27001 re-certified' },
  { year: '2025', event: 'Vision 2030: ₹5 Lakh Cr AUM target' },
];

export function AboutGFS() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Building2 className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="About Global Financial Services"
        subtitle="A multinational financial institution headquartered in Amaravati, India"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-9 gap-3">
        {COMPANY_STATS.map((stat, i) => (
          <Card key={stat.label} delay={i * 0.03} className="!p-3 text-center">
            <stat.icon className="w-4 h-4 text-[var(--color-gfs-accent)] mx-auto mb-1" />
            <div className="text-sm font-display font-bold text-[var(--color-gfs-text)]">{stat.value}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Mission & Vision */}
        <Card delay={0.1} className="!p-5">
          <div className="space-y-4">
            <div>
              <span className="gfs-text-label">Mission</span>
              <p className="text-xs text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">
                To be the most trusted financial partner for every Indian, empowering 100 million customers with secure, innovative, and accessible financial services through world-class technology and unwavering commitment to integrity.
              </p>
            </div>
            <div>
              <span className="gfs-text-label">Vision</span>
              <p className="text-xs text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">
                To be India's leading digital-first financial institution by 2030, with a ₹5 Lakh Cr AUM, serving customers across 15 countries through AI-powered banking, quantum-resistant security, and a culture of continuous innovation.
              </p>
            </div>
            <div>
              <span className="gfs-text-label">Values</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['Integrity', 'Innovation', 'Customer First', 'Security', 'Excellence', 'Transparency'].map((v) => (
                  <Badge key={v} variant="accent">{v}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card delay={0.15} className="!p-5">
          <span className="gfs-text-label">Enterprise Timeline</span>
          <div className="mt-3 space-y-2">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-[var(--color-gfs-accent)] w-10 flex-shrink-0 pt-0.5">{m.year}</span>
                <div className="w-2 h-2 rounded-full bg-[var(--color-gfs-border)] mt-1.5 flex-shrink-0" />
                <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{m.event}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Global Locations */}
      <Card delay={0.2} className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Global Presence</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {GLOBAL_LOCATIONS.map((loc) => (
            <motion.div key={loc.city} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] hover:border-[var(--color-gfs-border)] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{loc.city}</span>
                <Badge variant={loc.type === 'headquarters' ? 'accent' : loc.type === 'datacenter' ? 'medium' : 'default'}>
                  {loc.type}
                </Badge>
              </div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{loc.role}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{loc.employees.toLocaleString()} employees • {loc.country}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Business Units */}
      <Card delay={0.25} className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Business Units</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {BUSINESS_UNITS.map((bu) => (
            <motion.div key={bu.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] hover:border-[var(--color-gfs-accent)]/30 transition-colors cursor-pointer">
              <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{bu.name}</span>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{bu.description}</div>
              <div className="flex items-center gap-3 mt-2 text-[9px] text-[var(--color-gfs-text-muted)]">
                <span>{bu.employees.toLocaleString()} employees</span>
                <span>Revenue: {bu.revenue}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {bu.products.slice(0, 4).map((p) => <Badge key={p} variant="default">{p}</Badge>)}
                {bu.products.length > 4 && <Badge variant="default">+{bu.products.length - 4}</Badge>}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

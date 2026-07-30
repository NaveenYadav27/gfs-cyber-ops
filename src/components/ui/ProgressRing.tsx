interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({ progress, size = 40, strokeWidth = 3, color = 'var(--color-gfs-accent)', label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="var(--color-gfs-elevated)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        fill="var(--color-gfs-text)" fontSize={size * 0.22} fontFamily="var(--font-mono)">
        {Math.round(progress)}
      </text>
    </svg>
  );
}

import type { ReactNode } from 'react'

// --- Chips -----------------------------------------------------------------

type Tone = 'accent' | 'gold' | 'green' | 'amber' | 'red' | 'gray'

const toneClass: Record<Tone, string> = {
  accent: 'text-accent border-accent/40 bg-accent/10',
  gold: 'text-gold border-gold/40 bg-gold/10',
  green: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  amber: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  red: 'text-red-300 border-red-400/30 bg-red-400/10',
  gray: 'text-mute border-hair bg-white/5',
}

export function Chip({ children, tone = 'gray' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${toneClass[tone]}`}
    >
      {children}
    </span>
  )
}

export function estadoTone(estado: string): Tone {
  switch (estado) {
    case 'Publicado':
    case 'Medido':
    case 'Aprobado':
      return 'green'
    case 'En diseño':
    case 'En revisión':
    case 'Programado':
      return 'amber'
    case 'Pausado':
    case 'Descartado':
      return 'gray'
    default:
      return 'gray'
  }
}

export function priorityTone(p: string): Tone {
  if (p === 'Alta') return 'accent'
  if (p === 'Media') return 'gold'
  return 'gray'
}

export function statusTone(status: string): Tone {
  switch (status) {
    case 'Active':
      return 'green'
    case 'Dormant':
      return 'amber'
    case 'Needs data':
      return 'amber'
    case 'Economic-value':
      return 'gray'
    default:
      return 'gray'
  }
}

export function severityTone(s: string): Tone {
  switch (s) {
    case 'High':
      return 'red'
    case 'Medium':
      return 'amber'
    case 'Low':
      return 'gray'
    default:
      return 'gray'
  }
}

export function confidenceTone(c: string): Tone {
  if (c === 'High') return 'green'
  if (c === 'Medium-high') return 'gold'
  if (c === 'Medium') return 'amber'
  return 'gray'
}

// --- Layout primitives -----------------------------------------------------

export function Panel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`panel p-4 ${className}`}>{children}</div>
}

export function SectionTitle({
  children,
  right,
}: {
  children: ReactNode
  right?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="section-label">{children}</h3>
      {right}
    </div>
  )
}

export function EmptyState({
  title,
  hint,
}: {
  title: string
  hint?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-hair bg-white/[0.015] px-6 py-10 text-center">
      <div className="mb-2 h-8 w-8 rounded-full border border-hair" />
      <p className="text-sm text-mute">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-xs text-mute2">{hint}</p>}
    </div>
  )
}

export function StatDot({ tone }: { tone: 'ok' | 'warn' | 'off' }) {
  const c =
    tone === 'ok'
      ? 'bg-emerald-400'
      : tone === 'warn'
        ? 'bg-amber-400'
        : 'bg-mute2'
  return <span className={`inline-block h-2 w-2 rounded-full ${c}`} />
}

export function PageHeader({
  title,
  subtitle,
  chip,
}: {
  title: string
  subtitle?: string
  chip?: ReactNode
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-warm">{title}</h1>
        {chip}
      </div>
      {subtitle && <p className="mt-1 text-sm text-mute">{subtitle}</p>}
    </div>
  )
}

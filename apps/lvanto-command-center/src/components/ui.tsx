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

// --- Visual-only action button --------------------------------------------

// Visual-only by default: these buttons take no action in the prototype, so they
// carry a not-allowed cursor, reduced opacity, and an explanatory title.
export function ActionButton({
  label,
  tone = 'default',
  className = '',
}: {
  label: ReactNode
  tone?: 'default' | 'accent'
  className?: string
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="Visual only — no action in this prototype"
      className={`cursor-not-allowed rounded-[10px] border px-3 py-2 text-[12px] opacity-70 ${
        tone === 'accent'
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-hair bg-panel2 text-mute'
      } ${className}`}
    >
      {label}
    </button>
  )
}

// --- Status tile (system health style) ------------------------------------

export function StatusTile({
  label,
  status,
  tone,
}: {
  label: string
  status: string
  tone: 'ok' | 'warn' | 'off'
}) {
  return (
    <div className="rounded-xl2 border border-hair bg-panel p-3">
      <div className="flex items-center gap-2">
        <StatDot tone={tone} />
        <span className="text-xs text-warm">{label}</span>
      </div>
      <p className="meta mt-1.5">{status}</p>
    </div>
  )
}

// --- Simple data table -----------------------------------------------------

export function DataTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="scroll-thin overflow-x-auto rounded-xl2 border border-hair">
      <table className="w-full min-w-[720px] text-left text-[12px]">
        <thead>
          <tr className="border-b border-hair bg-panel2">
            {columns.map((c) => (
              <th
                key={c}
                className="whitespace-nowrap px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-mute2"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-hair last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-2 text-mute">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

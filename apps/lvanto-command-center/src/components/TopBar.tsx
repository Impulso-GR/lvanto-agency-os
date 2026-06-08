import { useLocation } from 'react-router-dom'
import { notifications } from '../data/mockData'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY_READ: Record<string, boolean> = {}

const labels: Record<string, string> = {
  hoy: 'Hoy',
  'auditoria-meta': 'Auditoría Meta',
  clients: 'Clientes',
  animalfood: 'AnimalFood',
  brands: 'Marcas',
  canfeed: 'Canfeed',
  tasks: 'Tareas',
  signals: 'Señales',
  metrics: 'Métricas',
  notifications: 'Notificaciones',
  decisions: 'Decisiones',
  claims: 'Control de claims',
  'paid-media': 'Traficker / Pauta',
  reports: 'Informes',
  'system-health': 'Estado del sistema',
  settings: 'Configuración',
}

function useBreadcrumb(): string[] {
  const { pathname } = useLocation()
  if (pathname === '/') return ['Lvanto', 'Panel principal']
  // Drop purely-structural segments (e.g. "brands") that aren't navigable pages.
  const segs = pathname.split('/').filter(Boolean).filter((s) => s !== 'brands')
  return ['Lvanto', ...segs.map((s) => labels[s] ?? s)]
}

export default function TopBar() {
  const crumbs = useBreadcrumb()
  const [read] = useLocalState<Record<string, boolean>>(KEYS.notifRead, EMPTY_READ)
  const unread = notifications.filter((n) => !read[n.id]).length

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-hair bg-carbon/80 px-5 backdrop-blur">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-mute2">/</span>}
            <span className={i === crumbs.length - 1 ? 'text-warm' : 'text-mute'}>{c}</span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        {/* search placeholder */}
        <div className="hidden items-center gap-2 rounded-[10px] border border-hair bg-panel px-3 py-1.5 text-xs text-mute2 sm:flex">
          <span>Buscar…</span>
          <span className="rounded border border-hair px-1 font-mono text-[10px] text-mute2">⌘K</span>
        </div>

        {/* notifications — unread count */}
        <button
          aria-label="Notificaciones"
          className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-hair bg-panel text-mute hover:text-warm"
        >
          <span className="text-sm">◔</span>
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[9px] text-carbon">
              {unread}
            </span>
          )}
        </button>

        {/* user */}
        <div className="flex items-center gap-2 rounded-[10px] border border-hair bg-panel px-2 py-1">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-panel2 text-[11px] text-warm">
            G
          </span>
          <span className="text-xs text-warm">Gonzalo</span>
          <span className="rounded border border-gold/40 bg-gold/10 px-1.5 font-mono text-[9px] uppercase tracking-wide text-gold">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}

import { useLocation } from 'react-router-dom'
import { notifications } from '../data/mockData'

const labels: Record<string, string> = {
  clients: 'Clients',
  animalfood: 'AnimalFood',
  brands: 'Brands',
  canfeed: 'Canfeed',
  tasks: 'Tasks',
  signals: 'Signals',
  metrics: 'Metrics',
  notifications: 'Notifications',
  decisions: 'Decisions',
  claims: 'Claims Guard',
  'paid-media': 'Paid Media',
  reports: 'Reports',
  'system-health': 'System Health',
  settings: 'Settings',
}

function useBreadcrumb(): string[] {
  const { pathname } = useLocation()
  if (pathname === '/') return ['Lvanto', 'Dashboard']
  // Drop purely-structural segments (e.g. "brands") that aren't navigable pages.
  const segs = pathname.split('/').filter(Boolean).filter((s) => s !== 'brands')
  return ['Lvanto', ...segs.map((s) => labels[s] ?? s)]
}

export default function TopBar() {
  const crumbs = useBreadcrumb()
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
          <span>Search…</span>
          <span className="rounded border border-hair px-1 font-mono text-[10px] text-mute2">⌘K</span>
        </div>

        {/* notifications */}
        <button
          aria-label="Notifications"
          className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-hair bg-panel text-mute hover:text-warm"
        >
          <span className="text-sm">◔</span>
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[9px] text-carbon">
            {notifications.length}
          </span>
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

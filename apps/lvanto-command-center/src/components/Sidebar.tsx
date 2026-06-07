import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface NavItem {
  label: string
  to?: string // routed when present; otherwise "coming soon"
}

interface NavGroup {
  heading: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    heading: 'Core',
    items: [
      { label: 'Dashboard', to: '/' },
      { label: 'Clients', to: '/clients' },
      { label: 'Tasks', to: '/clients/animalfood/tasks' },
    ],
  },
  {
    heading: 'Intelligence',
    items: [
      { label: 'Signals', to: '/signals' },
      { label: 'Metrics', to: '/metrics' },
      { label: 'Notifications', to: '/notifications' },
      { label: 'Decisions', to: '/decisions' },
    ],
  },
  {
    heading: 'Controls',
    items: [
      { label: 'Claims Guard', to: '/claims' },
      { label: 'Paid Media', to: '/paid-media' },
      { label: 'Reports', to: '/reports' },
    ],
  },
  {
    heading: 'System',
    items: [
      { label: 'Settings', to: '/settings' },
      { label: 'System Health', to: '/system-health' },
    ],
  },
]

const allTos = groups.flatMap((g) => g.items.map((i) => i.to).filter(Boolean) as string[])

// Route-aware active item: the longest `to` that prefixes the path wins.
// "/" matches only exactly; "/clients" stays active on its child pages
// (e.g. /clients/animalfood, /clients/animalfood/brands/canfeed) but yields to
// the more specific "/clients/animalfood/tasks" (Tasks) when present.
function activeTo(pathname: string): string | null {
  let best: string | null = null
  for (const to of allTos) {
    const matches =
      to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/')
    if (matches && (best === null || to.length > best.length)) best = to
  }
  return best
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-4">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-hair bg-carbon">
        <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden>
          <path d="M22 15 V45 H45" fill="none" stroke="#FF6B2B" strokeWidth="6" strokeLinecap="square" />
          <path d="M25 50 H44" stroke="#C4A35A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="text-[13px] font-semibold tracking-tight text-warm">Lvanto</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute2">
          Command Center
        </div>
      </div>
    </div>
  )
}

function ClientSwitcher() {
  return (
    <div className="px-3 pb-3">
      <button className="flex w-full items-center justify-between rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-left text-xs text-mute hover:border-white/15">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          All clients
        </span>
        <span className="text-mute2">▾</span>
      </button>
    </div>
  )
}

function Soon() {
  return (
    <span className="ml-auto rounded-full border border-hair px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-mute2">
      soon
    </span>
  )
}

function Item({ item, active }: { item: NavItem; active: boolean }) {
  const base =
    'group relative flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] transition-colors'
  if (!item.to) {
    return (
      <div className={`${base} cursor-not-allowed text-mute2`}>
        <span className="truncate">{item.label}</span>
        <Soon />
      </div>
    )
  }
  return (
    <Link
      to={item.to}
      className={`${base} ${
        active ? 'bg-panel2 text-warm' : 'text-mute hover:bg-white/[0.03] hover:text-warm'
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export default function Sidebar(): ReactNode {
  const { pathname } = useLocation()
  const active = activeTo(pathname)
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-hair bg-panel">
      <Wordmark />
      <ClientSwitcher />
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {groups.map((g) => (
          <div key={g.heading} className="mb-4">
            <div className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute2">
              {g.heading}
            </div>
            <div className="space-y-0.5">
              {g.items.map((it) => (
                <Item key={it.label} item={it} active={it.to === active} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-hair px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-hair bg-panel2 text-[11px] text-warm">
            G
          </span>
          <div className="leading-tight">
            <div className="text-xs text-warm">Gonzalo</div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-mute2">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

import { Link } from 'react-router-dom'
import {
  activity,
  clients,
  notifications,
  systemHealth,
  tasks,
} from '../data/mockData'
import {
  Chip,
  EmptyState,
  PageHeader,
  Panel,
  SectionTitle,
  StatusTile,
  priorityTone,
  severityTone,
  estadoTone,
} from '../components/ui'

function ClientCard({
  id,
  name,
  status,
  brands,
  openTasks,
  alerts,
  note,
}: (typeof clients)[number]) {
  const active = status === 'Active'
  if (!active) {
    return (
      <div className="rounded-xl2 border border-dashed border-hair bg-white/[0.01] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-mute">{name}</span>
          <Chip tone="gray">Not onboarded</Chip>
        </div>
        <p className="mt-3 text-xs text-mute2">{note}</p>
      </div>
    )
  }
  return (
    <Link
      to="/clients/animalfood"
      className="relative block rounded-xl2 border border-hair bg-panel2 p-4 transition-colors hover:border-white/15"
    >
      <span className="absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-warm">{name}</span>
        <Chip tone="green">Active</Chip>
      </div>
      <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-mute">
        <span>{brands} brands</span>
        <span>{openTasks} open</span>
        <span className="text-amber-300">⚠ {alerts} alerts</span>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const priorities = tasks.filter((t) => t.estado !== 'Pausado').slice(0, 3)
  return (
    <>
      <PageHeader
        title="Lvanto Command Center"
        subtitle="Multi-client operating system · 1 active client workspace"
        chip={<Chip tone="green">● Operational</Chip>}
      />

      {/* Clients */}
      <div className="mb-6">
        <SectionTitle>Clients</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((c) => (
            <ClientCard key={c.id} {...c} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Priorities */}
        <Panel className="lg:col-span-2">
          <SectionTitle right={<Chip tone="gray">cross-client</Chip>}>
            Today&apos;s priorities
          </SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {priorities.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5">
                <Chip tone={priorityTone(t.prioridad)}>{t.prioridad}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-warm">{t.title}</p>
                  <p className="meta truncate">
                    {t.client} · {t.brand} — {t.nextAction}
                  </p>
                </div>
                <Chip tone={estadoTone(t.estado)}>{t.estado}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Activity */}
        <Panel>
          <SectionTitle>Activity</SectionTitle>
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.id} className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mute2" />
                <div>
                  <p className="text-[13px] leading-snug text-mute">{a.text}</p>
                  <p className="meta">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Global alerts */}
        <Panel className="lg:col-span-2">
          <SectionTitle>Global alerts</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-center gap-3 py-2.5">
                <Chip tone={n.severity === 'System' ? 'gray' : severityTone(n.severity)}>
                  {n.severity}
                </Chip>
                <span className="flex-1 text-sm text-warm">{n.title}</span>
                <span className="meta">{n.owner}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Decisions empty state */}
        <Panel>
          <SectionTitle>Decisions</SectionTitle>
          <EmptyState
            title="No client decisions pending"
            hint="Decision Inbox is a Phase 2 surface (needs a canonical decisions source)."
          />
        </Panel>
      </div>

      {/* System health strip */}
      <div className="mt-6">
        <SectionTitle>System health</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {systemHealth.map((h) => (
            <StatusTile key={h.label} label={h.label} status={h.status} tone={h.tone} />
          ))}
        </div>
      </div>
    </>
  )
}

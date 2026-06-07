import { Link } from 'react-router-dom'
import { clients } from '../data/mockData'
import { Chip, PageHeader, SectionTitle } from '../components/ui'

export default function Clients() {
  return (
    <>
      <PageHeader
        title="Clients Center"
        subtitle="All Lvanto client workspaces"
        chip={<Chip tone="gray">{clients.length} clients</Chip>}
      />

      <SectionTitle right={<Chip tone="green">1 active</Chip>}>Workspaces</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((c) => {
          const active = c.status === 'Active'
          if (!active) {
            return (
              <div
                key={c.id}
                className="rounded-xl2 border border-dashed border-hair bg-white/[0.01] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mute">{c.name}</span>
                  <Chip tone="gray">Inactive</Chip>
                </div>
                <p className="mt-3 text-xs text-mute2">Not onboarded yet</p>
                <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-mute2">
                  <span>— brands</span>
                  <span>— tasks</span>
                  <span>— alerts</span>
                </div>
              </div>
            )
          }
          return (
            <Link
              key={c.id}
              to="/clients/animalfood"
              className="relative block rounded-xl2 border border-hair bg-panel2 p-4 transition-colors hover:border-white/15"
            >
              <span className="absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-warm">{c.name}</span>
                <Chip tone="green">Active</Chip>
              </div>
              <p className="meta mt-1">Workspace open</p>
              <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-mute">
                <span>{c.brands} brands</span>
                <span>{c.openTasks} tasks</span>
                <span className="text-amber-300">⚠ {c.alerts}</span>
              </div>
              <div className="mt-3 text-[11px] text-accent">Open workspace →</div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

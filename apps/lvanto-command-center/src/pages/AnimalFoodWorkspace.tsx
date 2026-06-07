import { Link } from 'react-router-dom'
import { activity, animalfoodBrands, signals, tasks } from '../data/mockData'
import {
  Chip,
  EmptyState,
  PageHeader,
  Panel,
  SectionTitle,
  confidenceTone,
  estadoTone,
  priorityTone,
  statusTone,
} from '../components/ui'

function BrandCard({ brand }: { brand: (typeof animalfoodBrands)[number] }) {
  const isCanfeed = brand.id === 'canfeed'
  const inner = (
    <div
      className={`h-full rounded-xl2 border bg-panel2 p-3.5 transition-colors ${
        isCanfeed ? 'border-accent/40 hover:border-accent/60' : 'border-hair hover:border-white/15'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-warm">{brand.name}</span>
        <Chip tone={statusTone(brand.status)}>{brand.status}</Chip>
      </div>
      <p className="mt-1 text-xs text-mute">{brand.lane}</p>
      <p className="meta mt-2 truncate">{brand.account ?? 'no account'}</p>
      <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-mute2">{brand.note}</p>
    </div>
  )
  return isCanfeed ? (
    <Link to="/clients/animalfood/brands/canfeed" className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  )
}

export default function AnimalFoodWorkspace() {
  const priorities = tasks.filter((t) => t.estado !== 'Pausado').slice(0, 4)
  const actionRequired = tasks.filter((t) => t.flag && t.flag.toLowerCase().includes('approval'))

  return (
    <>
      <PageHeader
        title="AnimalFood Workspace"
        subtitle="Client workspace · 9 brands"
        chip={<Chip tone="green">Active</Chip>}
      />

      {/* Portfolio grid — all 9 brands */}
      <div className="mb-6">
        <SectionTitle right={<Chip tone="gray">portfolio · 9</Chip>}>Brand portfolio</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {animalfoodBrands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top priorities (dominant) */}
        <Panel className="lg:col-span-2">
          <SectionTitle right={<Chip tone="accent">action-first</Chip>}>Top priorities</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {priorities.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <Chip tone={priorityTone(t.prioridad)}>{t.prioridad}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-warm">{t.title}</p>
                  <p className="meta truncate">{t.nextAction}</p>
                </div>
                <span className="hidden sm:block">
                  <Chip tone={estadoTone(t.estado)}>{t.estado}</Chip>
                </span>
                <span className="meta hidden md:block">{t.owner}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Action required / decisions */}
        <Panel>
          <SectionTitle>Action required</SectionTitle>
          {actionRequired.length ? (
            <ul className="space-y-3">
              {actionRequired.map((t) => (
                <li key={t.id} className="rounded-[10px] border border-hair bg-panel2 p-3">
                  <p className="text-sm text-warm">{t.title}</p>
                  <p className="meta mt-1">{t.flag}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-[11px] text-accent">
                      Approve
                    </span>
                    <span className="rounded-md border border-hair px-2 py-1 text-[11px] text-mute">
                      Hold
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Nothing awaiting decision" />
          )}
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Strategic signals */}
        <Panel className="lg:col-span-2">
          <SectionTitle>Strategic signals</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {signals.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-2.5">
                <Chip tone={confidenceTone(s.confidence)}>{s.confidence}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-warm">{s.title}</p>
                  <p className="meta truncate">
                    {s.brands} · {s.meaning}
                  </p>
                </div>
                <span className="hidden md:block">
                  <Chip tone="gray">{s.decision}</Chip>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Metrics empty state + activity */}
        <div className="space-y-6">
          <Panel>
            <SectionTitle>Metrics</SectionTitle>
            <EmptyState
              title="No real performance data yet"
              hint="05 · MÉTRICAS pending manual capture."
            />
          </Panel>
          <Panel>
            <SectionTitle>Activity</SectionTitle>
            <ul className="space-y-2.5">
              {activity.slice(0, 4).map((a) => (
                <li key={a.id} className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mute2" />
                  <p className="text-[13px] leading-snug text-mute">{a.text}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

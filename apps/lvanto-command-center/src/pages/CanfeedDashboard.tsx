import { Link } from 'react-router-dom'
import {
  canfeedClaims,
  canfeedProductionChecklist,
  signals,
} from '../data/mockData'
import {
  Chip,
  EmptyState,
  PageHeader,
  Panel,
  SectionTitle,
} from '../components/ui'

const canfeedSignals = signals.filter((s) =>
  s.brands.toLowerCase().includes('canfeed') || s.brands === 'All brands',
)

function ClaimList({ title, items, tone }: { title: string; items: string[]; tone: 'green' | 'red' | 'amber' }) {
  const dot = tone === 'green' ? 'bg-emerald-400' : tone === 'red' ? 'bg-red-400' : 'bg-amber-400'
  return (
    <div className="rounded-[10px] border border-hair bg-panel2 p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="section-label">{title}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map((c) => (
          <li key={c} className="text-[12px] leading-snug text-mute">
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CanfeedDashboard() {
  return (
    <>
      <div className="mb-1">
        <Link to="/clients/animalfood" className="meta hover:text-warm">
          ← AnimalFood Workspace
        </Link>
      </div>
      <PageHeader
        title="Canfeed — Brand Dashboard"
        subtitle="Super-premium dog food · Five S Plus · Evidence-led education"
        chip={<Chip tone="accent">Premium</Chip>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active production module */}
        <Panel className="lg:col-span-2">
          <SectionTitle right={<Chip tone="amber">En diseño</Chip>}>Active production module</SectionTitle>
          <div className="rounded-[10px] border border-accent/30 bg-accent/[0.04] p-4">
            <h3 className="text-base font-medium text-warm">Protect Pack × Five S Plus</h3>
            <p className="mt-1 text-sm text-mute">Pieza puente + reusable PSD base</p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
              <Meta k="Status" v="En diseño" />
              <Meta k="Priority" v="Alta" />
              <Meta k="Owner" v="Gonzalo → Aranza" />
              <Meta k="Target" v="Today / week" />
            </div>
            <div className="mt-4 rounded-[8px] border border-hair bg-panel px-3 py-2">
              <span className="section-label">Next action</span>
              <p className="mt-0.5 text-sm text-warm">Design S1 Cover + S4 Protect Pack hero</p>
            </div>
          </div>

          {/* Production checklist */}
          <div className="mt-4">
            <SectionTitle>Production checklist</SectionTitle>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {canfeedProductionChecklist.map((step) => (
                <li
                  key={step}
                  className="flex items-center gap-2 rounded-[10px] border border-hair bg-panel2 px-3 py-2"
                >
                  <span className="h-3.5 w-3.5 rounded-[4px] border border-hair" />
                  <span className="text-[13px] text-mute">{step}</span>
                  <span className="meta ml-auto">pending</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Action queue + visual direction */}
        <div className="space-y-6">
          <Panel>
            <SectionTitle>Action queue</SectionTitle>
            <div className="space-y-2">
              <QueueBtn label="Design S1 Cover" tone="accent" />
              <QueueBtn label="Design S4 Protect Pack hero" tone="accent" />
              <QueueBtn label="Build reusable PSD base" />
              <QueueBtn label="Export PNGs (1080×1350)" />
            </div>
            <p className="meta mt-3">Buttons are visual only in this prototype.</p>
          </Panel>

          <Panel>
            <SectionTitle>Visual direction</SectionTitle>
            <ul className="space-y-1.5 text-[12px] text-mute">
              <li>Golden-hour documentary · Tim Flach mood</li>
              <li>Real packshot only — never invented packaging</li>
              <li>#1E5A8E info · #B8732D Protect Pack / CTA</li>
              <li>Cream uppercase humanist sans</li>
              <li>Premium restraint · whitespace</li>
            </ul>
          </Panel>
        </div>
      </div>

      {/* Claims Guard */}
      <div className="mt-6">
        <SectionTitle right={<Chip tone="gold">safety</Chip>}>Claims Guard</SectionTitle>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <ClaimList title="Allowed" items={canfeedClaims.allowed} tone="green" />
          <ClaimList title="Blocked" items={canfeedClaims.blocked} tone="red" />
          <ClaimList title="Needs data" items={canfeedClaims.needsData} tone="amber" />
        </div>
      </div>

      {/* Signals + metrics */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle>Strategic signals</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {canfeedSignals.map((s) => (
              <li key={s.id} className="py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm">{s.title}</span>
                  <Chip tone="gray">{s.decision}</Chip>
                </div>
                <p className="meta mt-0.5">{s.meaning}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle>Metrics</SectionTitle>
          <EmptyState title="No performance data yet" hint="Run manual capture into 05 · MÉTRICAS." />
        </Panel>
      </div>
    </>
  )
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="section-label">{k}</div>
      <div className="mt-0.5 text-[13px] text-warm">{v}</div>
    </div>
  )
}

function QueueBtn({ label, tone }: { label: string; tone?: 'accent' }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-[10px] border px-3 py-2 text-left text-[13px] ${
        tone === 'accent'
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-hair bg-panel2 text-mute hover:text-warm'
      }`}
    >
      {label}
      <span className="text-mute2">→</span>
    </button>
  )
}

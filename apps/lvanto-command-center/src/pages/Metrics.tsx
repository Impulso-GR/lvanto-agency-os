import { useState } from 'react'
import { manualCaptureChecklist, metricDefs } from '../data/mockData'
import {
  Chip,
  EmptyState,
  PageHeader,
  Panel,
  SectionTitle,
} from '../components/ui'

export default function Metrics() {
  // Local UI state only — not persisted, not connected to anything.
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const toggle = (c: string) => setChecked((prev) => ({ ...prev, [c]: !prev[c] }))

  return (
    <>
      <PageHeader
        title="Metrics Center"
        subtitle="Own-performance data — honest empty state"
        chip={<Chip tone="amber">No data</Chip>}
      />

      <Panel className="mb-6">
        <EmptyState
          title="No real performance data yet"
          hint="05 · MÉTRICAS pending manual capture. No fake charts are shown — metrics appear once real numbers are captured."
        />
        <p className="meta mt-3 text-center">
          Performance charts will appear here once numbers are captured manually into 05 · MÉTRICAS.
        </p>
      </Panel>

      <SectionTitle>Metric cards (disabled until captured)</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {metricDefs.map((m) => (
          <div
            key={m.key}
            className="rounded-xl2 border border-dashed border-hair bg-white/[0.01] p-4 opacity-70"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-mute">{m.label}</span>
              {m.future && <Chip tone="gray">future</Chip>}
            </div>
            <div className="mt-3 font-mono text-2xl text-mute2">—</div>
            <p className="meta mt-1">no data</p>
          </div>
        ))}
      </div>

      <Panel>
        <SectionTitle
          right={
            <span className="flex items-center gap-2">
              <Chip tone="gray">visual only</Chip>
              <Chip tone="gold">Aranza</Chip>
            </span>
          }
        >
          Manual capture checklist
        </SectionTitle>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {manualCaptureChecklist.map((c) => {
            const isOn = !!checked[c]
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => toggle(c)}
                  className="flex w-full items-center gap-2 rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-left hover:border-white/15"
                >
                  <span
                    className={`grid h-3.5 w-3.5 place-items-center rounded-[4px] border ${
                      isOn ? 'border-accent bg-accent/20 text-accent' : 'border-hair'
                    }`}
                  >
                    {isOn && <span className="text-[9px] leading-none">✓</span>}
                  </span>
                  <span className={`text-[13px] ${isOn ? 'text-warm line-through' : 'text-mute'}`}>
                    {c}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="meta mt-3">
          Checklist is a local visual aid (not saved). Capture into 05 · MÉTRICAS by hand — real
          numbers only, never invent.
        </p>
      </Panel>
    </>
  )
}

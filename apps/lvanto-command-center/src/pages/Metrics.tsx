import { manualCaptureChecklist, metricDefs } from '../data/mockData'
import {
  Chip,
  EmptyState,
  PageHeader,
  Panel,
  SectionTitle,
} from '../components/ui'

export default function Metrics() {
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
        <SectionTitle right={<Chip tone="gold">Aranza</Chip>}>Manual capture checklist</SectionTitle>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {manualCaptureChecklist.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 rounded-[10px] border border-hair bg-panel2 px-3 py-2"
            >
              <span className="h-3.5 w-3.5 rounded-[4px] border border-hair" />
              <span className="text-[13px] text-mute">{c}</span>
            </li>
          ))}
        </ul>
        <p className="meta mt-3">Capture into 05 · MÉTRICAS by hand. Real numbers only — never invent.</p>
      </Panel>
    </>
  )
}

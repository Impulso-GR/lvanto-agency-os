import { decisions } from '../data/mockData'
import {
  ActionButton,
  Chip,
  PageHeader,
  Panel,
  SectionTitle,
  severityTone,
} from '../components/ui'

export default function Decisions() {
  return (
    <>
      <PageHeader
        title="Decision Inbox"
        subtitle="Only items that need Gonzalo's judgment"
        chip={<Chip tone="amber">prototype</Chip>}
      />

      <Panel className="mb-4 border-amber-400/20 bg-amber-400/[0.03]">
        <p className="text-[13px] text-mute">
          Prototype surface — in production this reads from a canonical decisions source (Phase 2).
          Buttons below are visual only.
        </p>
      </Panel>

      <SectionTitle right={<Chip tone="gray">{decisions.length} pending</Chip>}>Pending decisions</SectionTitle>
      <div className="space-y-3">
        {decisions.map((d) => (
          <div key={d.id} className="rounded-xl2 border border-hair bg-panel2 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone={severityTone(d.urgency)}>{d.urgency}</Chip>
              <span className="text-sm font-medium text-warm">{d.title}</span>
              <span className="meta ml-auto">
                {d.client} · {d.brand}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-mute">{d.why}</p>
            <div className="mt-3 flex items-center gap-2">
              <ActionButton label="Review" />
              <ActionButton label="Approve" tone="accent" />
              <ActionButton label="Defer" />
              <span className="meta ml-auto">Owner: {d.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

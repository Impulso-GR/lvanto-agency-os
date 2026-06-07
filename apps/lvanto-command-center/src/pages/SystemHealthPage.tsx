import { frontendHealth, lastCommitInfo } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle, StatusTile } from '../components/ui'

export default function SystemHealthPage() {
  return (
    <>
      <PageHeader
        title="System Health"
        subtitle="Local frontend status & integration state"
        chip={<Chip tone="green">● Local</Chip>}
      />

      <SectionTitle>Status</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {frontendHealth.map((h) => (
          <StatusTile key={h.label} label={h.label} status={h.status} tone={h.tone} />
        ))}
      </div>

      <Panel>
        <SectionTitle>Build info</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[10px] border border-hair bg-panel2 px-3 py-2">
            <span className="section-label">Last commit</span>
            <p className="meta mt-0.5">{lastCommitInfo}</p>
          </div>
          <div className="rounded-[10px] border border-hair bg-panel2 px-3 py-2">
            <span className="section-label">Data mode</span>
            <p className="meta mt-0.5">Static mock — no Sheets / backend / API connected</p>
          </div>
        </div>
        <p className="meta mt-3">
          This page reflects the frontend prototype only. Sheets, scheduler, and integrations live
          outside this app and are intentionally not connected here.
        </p>
      </Panel>
    </>
  )
}

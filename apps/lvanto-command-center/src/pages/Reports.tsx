import { reports } from '../data/mockData'
import { ActionButton, Chip, PageHeader, SectionTitle } from '../components/ui'

export default function Reports() {
  return (
    <>
      <PageHeader
        title="Reports Center"
        subtitle="Report templates — generation is a future capability"
        chip={<Chip tone="gray">{reports.length} templates</Chip>}
      />

      <SectionTitle>Available report templates</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl2 border border-hair bg-panel2 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-warm">{r.title}</h3>
              <Chip tone="gray">placeholder</Chip>
            </div>
            <p className="mt-1 text-[13px] text-mute">{r.desc}</p>
            <div className="mt-4 flex items-center gap-2">
              <ActionButton label="Generate report" tone="accent" />
              <ActionButton label="Preview" />
              <ActionButton label="Export" />
            </div>
          </div>
        ))}
      </div>
      <p className="meta mt-4">Buttons are visual only — no file is generated in this prototype.</p>
    </>
  )
}

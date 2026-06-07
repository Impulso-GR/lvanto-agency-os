import { allSignals } from '../data/mockData'
import {
  Chip,
  DataTable,
  PageHeader,
  Panel,
  SectionTitle,
  confidenceTone,
} from '../components/ui'

export default function Signals() {
  return (
    <>
      <PageHeader
        title="Signal Center"
        subtitle="Trend & portfolio intelligence — read surface"
        chip={<Chip tone="gray">{allSignals.length} signals</Chip>}
      />

      <Panel className="mb-6">
        <SectionTitle>Active signals</SectionTitle>
        <DataTable
          columns={['Signal', 'Confidence', 'Risk', 'Affected brands', 'Decision', 'Suggested action']}
          rows={allSignals.map((s) => [
            <span className="text-warm">{s.title}</span>,
            <Chip tone={confidenceTone(s.confidence)}>{s.confidence}</Chip>,
            <span>{s.risk ?? '—'}</span>,
            <span>{s.brands}</span>,
            <Chip tone="gray">{s.decision}</Chip>,
            <span>{s.meaning}</span>,
          ])}
        />
      </Panel>

      <p className="meta">
        Read-only intelligence. Signals come from the documented Trend Signals Log; nothing here is
        wired to a live source.
      </p>
    </>
  )
}

import { allSignals } from '../data/mockData'
import {
  Chip,
  DataTable,
  EmptyState,
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

      <p className="meta mb-6">
        Read-only intelligence. Signals come from the documented Trend Signals Log; nothing here is
        wired to a live source.
      </p>

      <Panel>
        <SectionTitle right={<Chip tone="gray">0</Chip>}>Archived signals</SectionTitle>
        <EmptyState title="No resolved signals yet" hint="Signals marked resolved or rejected will move here." />
      </Panel>
    </>
  )
}

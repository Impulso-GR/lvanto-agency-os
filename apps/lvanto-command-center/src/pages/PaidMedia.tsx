import { paidCampaigns, paidFunnel } from '../data/mockData'
import {
  Chip,
  DataTable,
  PageHeader,
  Panel,
  SectionTitle,
} from '../components/ui'

export default function PaidMedia() {
  return (
    <>
      <PageHeader
        title="Paid Media / Traficker Center"
        subtitle="Manual · read-only · no spend control"
        chip={<Chip tone="gray">manual</Chip>}
      />

      <Panel className="mb-6 border-amber-400/20 bg-amber-400/[0.03]">
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-mute">
          <Chip tone="red">No Meta connection</Chip>
          <Chip tone="gray">Manual report only</Chip>
          <Chip tone="gray">No spend control</Chip>
          <Chip tone="gray">No campaign / budget actions</Chip>
        </div>
      </Panel>

      {/* Funnel */}
      <SectionTitle>Funnel stages</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {paidFunnel.map((stage, i) => (
          <div key={stage} className="rounded-xl2 border border-hair bg-panel2 p-3">
            <div className="meta">{String(i + 1).padStart(2, '0')}</div>
            <div className="mt-1 text-[13px] leading-snug text-warm">{stage}</div>
            <div className="mt-2 font-mono text-[11px] text-mute2">no data</div>
          </div>
        ))}
      </div>

      {/* Manual campaign table */}
      <SectionTitle right={<Chip tone="amber">mock / manual</Chip>}>Campaign report (manual entry)</SectionTitle>
      <DataTable
        columns={[
          'Campaign',
          'Brand',
          'Funnel stage',
          'Spend',
          'CTR',
          'CPC',
          'Leads/msgs',
          'CPL',
          'Diagnosis',
          'Next action',
        ]}
        rows={paidCampaigns.map((r) => [
          <span className="text-mute2">{r.campaign}</span>,
          <span className="text-warm">{r.brand}</span>,
          <span>{r.stage}</span>,
          <span>{r.spend}</span>,
          <span>{r.ctr}</span>,
          <span>{r.cpc}</span>,
          <span>{r.leads}</span>,
          <span>{r.cpl}</span>,
          <span>{r.diagnosis}</span>,
          <span>{r.nextAction}</span>,
        ])}
      />
      <p className="meta mt-3">
        All values are placeholders. Numbers are entered by hand from Ads Manager; the system never
        reads or changes spend.
      </p>
    </>
  )
}

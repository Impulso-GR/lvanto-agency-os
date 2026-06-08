import { paidCampaigns, paidFunnel } from '../data/mockData'
import { ActionButton, Chip, DataTable, PageHeader, Panel, SectionTitle } from '../components/ui'

export default function PaidMedia() {
  return (
    <>
      <PageHeader
        title="Traficker / Pauta"
        subtitle="Manual · solo lectura · sin control de presupuesto"
        chip={<Chip tone="gray">manual</Chip>}
      />

      <Panel className="mb-6 border-amber-400/20 bg-amber-400/[0.03]">
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-mute">
          <Chip tone="red">Sin conexión a Meta</Chip>
          <Chip tone="gray">Solo informe manual</Chip>
          <Chip tone="gray">Sin control de presupuesto</Chip>
          <Chip tone="gray">Sin acciones de campaña</Chip>
        </div>
      </Panel>

      <SectionTitle>Etapas del funnel</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {paidFunnel.map((stage, i) => (
          <div key={stage} className="rounded-xl2 border border-hair bg-panel2 p-3">
            <div className="meta">{String(i + 1).padStart(2, '0')}</div>
            <div className="mt-1 text-[13px] leading-snug text-warm">{stage}</div>
            <div className="mt-2 font-mono text-[11px] text-mute2">sin datos</div>
          </div>
        ))}
      </div>

      <SectionTitle right={<Chip tone="amber">mock / manual</Chip>}>Informe de campañas (carga manual)</SectionTitle>
      <DataTable
        columns={['Campaña', 'Marca', 'Etapa funnel', 'Inversión', 'CTR', 'CPC', 'Leads/msjs', 'CPL', 'Diagnóstico', 'Próxima acción']}
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
      <div className="mt-4 flex items-center gap-3">
        <ActionButton label="Preparar informe manual" tone="accent" />
        <p className="meta">
          Todos los valores son placeholders. Los números se cargan a mano desde Ads Manager; el sistema nunca lee ni cambia la inversión.
        </p>
      </div>
    </>
  )
}

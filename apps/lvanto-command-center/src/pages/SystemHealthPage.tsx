import { systemHealth, lastCommitInfo } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle, StatusTile } from '../components/ui'

export default function SystemHealthPage() {
  return (
    <>
      <PageHeader
        title="Estado del sistema"
        subtitle="Estado del frontend local y de las integraciones"
        chip={<Chip tone="green">● Local</Chip>}
      />

      <SectionTitle>Estado</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {systemHealth.map((h) => (
          <StatusTile key={h.label} label={h.label} status={h.status} tone={h.tone} />
        ))}
      </div>

      <Panel>
        <SectionTitle>Información de versión</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[10px] border border-hair bg-panel2 px-3 py-2">
            <span className="section-label">Versión</span>
            <p className="meta mt-0.5">{lastCommitInfo}</p>
          </div>
          <div className="rounded-[10px] border border-hair bg-panel2 px-3 py-2">
            <span className="section-label">Modo de datos</span>
            <p className="meta mt-0.5">Mock estático / localStorage — sin Sheets / backend / API</p>
          </div>
        </div>
        <p className="meta mt-3">
          Esta página refleja solo el prototipo de frontend. Sheets, scheduler e integraciones viven fuera de
          esta app y están intencionalmente sin conectar.
        </p>
      </Panel>
    </>
  )
}

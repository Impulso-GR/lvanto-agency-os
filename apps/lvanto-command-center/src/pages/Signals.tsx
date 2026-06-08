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
import { confLabel } from '../i18n'

export default function Signals() {
  return (
    <>
      <PageHeader
        title="Centro de señales"
        subtitle="Inteligencia de tendencias y portafolio — superficie de lectura"
        chip={<Chip tone="gray">{allSignals.length} señales</Chip>}
      />

      <Panel className="mb-6">
        <SectionTitle>Señales activas</SectionTitle>
        <DataTable
          columns={['Señal', 'Confianza', 'Riesgo', 'Marcas afectadas', 'Decisión', 'Acción sugerida']}
          rows={allSignals.map((s) => [
            <span className="text-warm">{s.title}</span>,
            <Chip tone={confidenceTone(s.confidence)}>{confLabel[s.confidence] ?? s.confidence}</Chip>,
            <span>{s.risk ?? '—'}</span>,
            <span>{s.brands}</span>,
            <Chip tone="gray">{s.decision}</Chip>,
            <span>{s.meaning}</span>,
          ])}
        />
      </Panel>

      <p className="meta mb-6">
        Inteligencia de solo lectura. Las señales provienen del Trend Signals Log documentado; nada
        aquí está conectado a una fuente en vivo.
      </p>

      <Panel>
        <SectionTitle right={<Chip tone="gray">0</Chip>}>Señales archivadas</SectionTitle>
        <EmptyState title="Todavía no hay señales resueltas" hint="Las señales marcadas como resueltas o rechazadas aparecerán aquí." />
      </Panel>
    </>
  )
}

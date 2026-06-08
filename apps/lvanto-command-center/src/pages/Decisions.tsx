import { decisions } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle, severityTone } from '../components/ui'
import type { DecisionStatus } from '../i18n'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY: Record<string, DecisionStatus> = {}

function statusTone(s: DecisionStatus): 'gray' | 'amber' | 'green' {
  if (s === 'Aprobada') return 'green'
  if (s === 'Revisada' || s === 'Diferida') return 'amber'
  return 'gray'
}

export default function Decisions() {
  const [statuses, setStatuses] = useLocalState<Record<string, DecisionStatus>>(KEYS.decisionStatus, EMPTY)
  const set = (id: string, s: DecisionStatus) => setStatuses((prev) => ({ ...prev, [id]: s }))

  return (
    <>
      <PageHeader
        title="Bandeja de decisiones"
        subtitle="Solo lo que requiere el criterio de Gonzalo"
        chip={<Chip tone="amber">prototipo</Chip>}
      />

      <Panel className="mb-4 border-amber-400/20 bg-amber-400/[0.03]">
        <p className="text-[13px] text-mute">
          Acción local de prototipo — actualiza el estado solo en este navegador (localStorage). No
          ejecuta ninguna aprobación real.
        </p>
      </Panel>

      <SectionTitle right={<Chip tone="gray">{decisions.length} en cola</Chip>}>Decisiones pendientes</SectionTitle>
      <div className="space-y-3">
        {decisions.map((d) => {
          const status = statuses[d.id] ?? 'Pendiente'
          return (
            <div key={d.id} className="rounded-xl2 border border-hair bg-panel2 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={severityTone(d.urgency)}>{d.urgency === 'High' ? 'Alta' : d.urgency === 'Medium' ? 'Media' : 'Baja'}</Chip>
                <span className="text-sm font-medium text-warm">{d.title}</span>
                <Chip tone={statusTone(status)}>{status}</Chip>
                <span className="meta ml-auto">{d.client} · {d.brand}</span>
              </div>
              <p className="mt-2 text-[13px] text-mute">{d.why}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => set(d.id, 'Revisada')}
                  className="rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-[12px] text-mute hover:text-warm hover:border-white/15"
                >
                  Revisar
                </button>
                <button
                  type="button"
                  onClick={() => set(d.id, 'Aprobada')}
                  className="rounded-[10px] border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] text-accent hover:bg-accent/15"
                >
                  Aprobar
                </button>
                <button
                  type="button"
                  onClick={() => set(d.id, 'Diferida')}
                  className="rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-[12px] text-mute hover:text-warm hover:border-white/15"
                >
                  Diferir
                </button>
                <span className="meta ml-auto">Responsable: {d.owner}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

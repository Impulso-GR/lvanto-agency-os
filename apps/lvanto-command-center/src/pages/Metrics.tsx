import { manualCaptureChecklist, metricDefs } from '../data/mockData'
import { Chip, EmptyState, PageHeader, Panel, SectionTitle } from '../components/ui'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY_CHECK: Record<string, boolean> = {}

export default function Metrics() {
  const [checked, setChecked] = useLocalState<Record<string, boolean>>(KEYS.metricsChecklist, EMPTY_CHECK)
  const toggle = (c: string) => setChecked((prev) => ({ ...prev, [c]: !prev[c] }))
  const reset = () => setChecked(() => ({}))
  const done = manualCaptureChecklist.filter((c) => checked[c]).length
  const total = manualCaptureChecklist.length

  return (
    <>
      <PageHeader
        title="Centro de métricas"
        subtitle="Datos de rendimiento propio — estado vacío honesto"
        chip={<Chip tone="amber">Sin datos</Chip>}
      />

      <Panel className="mb-6">
        <EmptyState
          title="Todavía no hay métricas reales"
          hint="05 · MÉTRICAS pendiente de carga manual. No se muestran gráficos falsos — las métricas aparecen cuando se cargan números reales."
        />
        <p className="meta mt-3 text-center">
          Los gráficos de rendimiento aparecerán aquí una vez que se carguen números manualmente en 05 · MÉTRICAS.
        </p>
      </Panel>

      <SectionTitle>Tarjetas de métricas (deshabilitadas hasta cargar)</SectionTitle>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {metricDefs.map((m) => (
          <div key={m.key} className="rounded-xl2 border border-dashed border-hair bg-white/[0.01] p-4 opacity-70">
            <div className="flex items-center justify-between">
              <span className="text-xs text-mute">{m.label}</span>
              {m.future && <Chip tone="gray">futuro</Chip>}
            </div>
            <div className="mt-3 font-mono text-2xl text-mute2">—</div>
            <p className="meta mt-1">sin datos</p>
          </div>
        ))}
      </div>

      <Panel>
        <SectionTitle
          right={
            <span className="flex items-center gap-2">
              <Chip tone={done === total && total > 0 ? 'green' : 'gray'}>{done}/{total}</Chip>
              <Chip tone="gray">solo visual</Chip>
              <Chip tone="gold">Aranza</Chip>
              <button
                type="button"
                onClick={reset}
                className="rounded-[10px] border border-hair bg-panel2 px-2.5 py-1 text-[11px] text-mute hover:text-warm hover:border-white/15"
              >
                Resetear checklist
              </button>
            </span>
          }
        >
          Checklist de carga manual
        </SectionTitle>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {manualCaptureChecklist.map((c) => {
            const on = !!checked[c]
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => toggle(c)}
                  className="flex w-full items-center gap-2 rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-left hover:border-white/15"
                >
                  <span className={`grid h-3.5 w-3.5 place-items-center rounded-[4px] border ${on ? 'border-accent bg-accent/20 text-accent' : 'border-hair'}`}>
                    {on && <span className="text-[9px] leading-none">✓</span>}
                  </span>
                  <span className={`text-[13px] ${on ? 'text-warm line-through' : 'text-mute'}`}>{c}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="meta mt-3">
          Ayuda visual local (se guarda en este navegador). Cargar en 05 · MÉTRICAS a mano — solo números reales, nunca inventar.
        </p>
      </Panel>
    </>
  )
}

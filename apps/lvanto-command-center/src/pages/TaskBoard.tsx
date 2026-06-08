import { useState } from 'react'
import { canfeedClaims, canfeedProductionChecklist, signals, tasks } from '../data/mockData'
import type { Estado, Task } from '../types'
import { Chip, PageHeader, SectionTitle, estadoTone, priorityTone } from '../components/ui'
import { useLocalState, KEYS } from '../state/localStore'

const COLUMNS: Estado[] = [
  'Idea',
  'Brief listo',
  'En diseño',
  'En revisión',
  'Aprobado',
  'Programado',
  'Publicado',
  'Medido',
  'Pausado',
  'Descartado',
]

const EMPTY_STATUS: Record<string, Estado> = {}

function TaskCard({ task, estado, selected, onSelect }: { task: Task; estado: Estado; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-[10px] border bg-panel2 p-3 text-left transition-colors ${
        selected ? 'border-accent/60 ring-1 ring-accent/30' : 'border-hair hover:border-white/15'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <Chip tone="gray">{task.brand}</Chip>
        <Chip tone={priorityTone(task.prioridad)}>{task.prioridad}</Chip>
      </div>
      <p className="mt-2 text-[13px] font-medium leading-snug text-warm">{task.title}</p>
      <p className="meta mt-1.5 line-clamp-2">{task.nextAction}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="meta">{task.owner}</span>
        <Chip tone={estadoTone(estado)}>{estado}</Chip>
      </div>
    </button>
  )
}

function DetailPanel({
  task,
  estado,
  onChange,
}: {
  task: Task
  estado: Estado
  onChange: (e: Estado) => void
}) {
  const isCanfeed = task.id === 'canfeed-protect-pack'
  const relatedSignals = signals.filter(
    (s) => s.brands.toLowerCase().includes(task.brand.toLowerCase()) || s.brands === 'All brands',
  )
  return (
    <aside className="w-full shrink-0 rounded-xl2 border border-hair bg-panel p-4 lg:w-[360px]">
      <div className="mb-3 flex items-center justify-between">
        <span className="section-label">Tarea seleccionada</span>
        <Chip tone={estadoTone(estado)}>{estado}</Chip>
      </div>
      <h3 className="text-base font-medium leading-snug text-warm">{task.title}</h3>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        <Field k="Cliente" v={task.client} />
        <Field k="Marca" v={task.brand} />
        <Field k="Prioridad" v={task.prioridad} />
        <Field k="Responsable" v={task.owner} />
        <Field k="Objetivo" v="Hoy / esta semana" />
        <Field k="Carry-over" v={task.carryOver ? 'Sí' : 'No'} />
      </div>

      <div className="mt-3 rounded-[10px] border border-hair bg-panel2 px-3 py-2">
        <span className="section-label">Próxima acción</span>
        <p className="mt-0.5 text-[13px] text-warm">{task.nextAction}</p>
      </div>

      {/* Local status control */}
      <div className="mt-4">
        <label className="section-label">Cambiar estado (local)</label>
        <select
          value={estado}
          onChange={(e) => onChange(e.target.value as Estado)}
          className="mt-1.5 w-full rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-[13px] text-warm focus:border-accent/50 focus:outline-none"
        >
          {COLUMNS.map((c) => (
            <option key={c} value={c} className="bg-panel2">
              {c}
            </option>
          ))}
        </select>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange('En revisión')}
            className="rounded-[10px] border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] text-accent hover:bg-accent/15"
          >
            Marcar listo
          </button>
          <button
            type="button"
            onClick={() => onChange('Pausado')}
            className="rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-[12px] text-mute hover:text-warm hover:border-white/15"
          >
            Diferir
          </button>
        </div>
      </div>

      {isCanfeed && (
        <div className="mt-4">
          <span className="section-label">Restricciones de claims</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {canfeedClaims.blocked.slice(0, 6).map((c) => (
              <span key={c} className="rounded border border-red-400/30 bg-red-400/10 px-1.5 py-0.5 text-[10px] text-red-300">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <span className="section-label">Checklist de producción</span>
            <ul className="mt-2 space-y-1.5">
              {canfeedProductionChecklist.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[12px] text-mute">
                  <span className="h-3 w-3 rounded-[3px] border border-hair" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-4">
        <span className="section-label">Señales relacionadas</span>
        <ul className="mt-2 space-y-1.5">
          {relatedSignals.length ? (
            relatedSignals.map((s) => (
              <li key={s.id} className="text-[12px] leading-snug text-mute">
                • {s.title} <span className="text-mute2">({s.decision})</span>
              </li>
            ))
          ) : (
            <li className="text-[12px] text-mute2">Sin señales relacionadas.</li>
          )}
        </ul>
      </div>

      <p className="meta mt-4">Cambios guardados localmente (localStorage). No tocan el calendario real.</p>
    </aside>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="section-label">{k}</div>
      <div className="mt-0.5 text-[12px] text-warm">{v}</div>
    </div>
  )
}

export default function TaskBoard() {
  const [selectedId, setSelectedId] = useState<string>('canfeed-protect-pack')
  const [overrides, setOverrides] = useLocalState<Record<string, Estado>>(KEYS.taskStatus, EMPTY_STATUS)

  const estadoOf = (t: Task): Estado => overrides[t.id] ?? t.estado
  const selected = tasks.find((t) => t.id === selectedId) ?? tasks[0]
  const setEstado = (id: string, e: Estado) => setOverrides((prev) => ({ ...prev, [id]: e }))

  return (
    <>
      <PageHeader
        title="Tablero de tareas"
        subtitle="AnimalFood · pipeline operativo"
        chip={<Chip tone="gray">{tasks.length} tareas</Chip>}
      />

      <div className="mb-4 rounded-xl2 border border-amber-400/20 bg-amber-400/[0.03] px-4 py-2.5">
        <p className="text-[13px] text-mute">
          Los cambios son locales. No modifican el calendario real (05 · MÉTRICAS / 01 · CALENDARIO).
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="scroll-thin overflow-x-auto pb-3">
            <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
              {COLUMNS.map((col) => {
                const colTasks = tasks.filter((t) => estadoOf(t) === col)
                return (
                  <div key={col} className="w-60 shrink-0">
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span className="section-label">{col}</span>
                      <span className="meta">{colTasks.length}</span>
                    </div>
                    <div className="space-y-2 rounded-xl2 border border-hair bg-panel/60 p-2">
                      {colTasks.length ? (
                        colTasks.map((t) => (
                          <TaskCard
                            key={t.id}
                            task={t}
                            estado={col}
                            selected={t.id === selectedId}
                            onSelect={() => setSelectedId(t.id)}
                          />
                        ))
                      ) : (
                        <div className="rounded-[10px] border border-dashed border-hair px-3 py-5 text-center">
                          <p className="text-[11px] text-mute2">No hay tareas en este estado</p>
                          <p className="mt-0.5 text-[10px] text-mute2/70">Las tareas movidas aquí aparecerán abajo.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <SectionTitle>Pipeline</SectionTitle>
          <p className="meta">
            Desplazá horizontalmente para ver todos los estados. Seleccioná una tarjeta para verla a la derecha.
          </p>
        </div>

        <DetailPanel task={selected} estado={estadoOf(selected)} onChange={(e) => setEstado(selected.id, e)} />
      </div>
    </>
  )
}

import { useState } from 'react'
import { canfeedClaims, canfeedProductionChecklist, signals, tasks } from '../data/mockData'
import type { Estado, Task } from '../types'
import {
  Chip,
  PageHeader,
  SectionTitle,
  estadoTone,
  priorityTone,
} from '../components/ui'

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

function TaskCard({
  task,
  selected,
  onSelect,
}: {
  task: Task
  selected: boolean
  onSelect: () => void
}) {
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
        {task.flag && (
          <span
            className={`rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase ${
              task.flag.toLowerCase().includes('approval')
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-hair text-mute2'
            }`}
          >
            {task.flag}
          </span>
        )}
      </div>
    </button>
  )
}

function DetailPanel({ task }: { task: Task }) {
  const isCanfeed = task.id === 'canfeed-protect-pack'
  const relatedSignals = signals.filter(
    (s) => s.brands.toLowerCase().includes(task.brand.toLowerCase()) || s.brands === 'All brands',
  )
  return (
    <aside className="w-full shrink-0 rounded-xl2 border border-hair bg-panel p-4 lg:w-[360px]">
      <div className="mb-3 flex items-center justify-between">
        <span className="section-label">Selected task</span>
        <Chip tone={estadoTone(task.estado)}>{task.estado}</Chip>
      </div>
      <h3 className="text-base font-medium leading-snug text-warm">{task.title}</h3>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        <Field k="Client" v={task.client} />
        <Field k="Brand" v={task.brand} />
        <Field k="Priority" v={task.prioridad} />
        <Field k="Owner" v={task.owner} />
        <Field k="Target" v="Today / this week" />
        <Field k="Carry-over" v={task.carryOver ? 'Sí' : 'No'} />
      </div>

      <div className="mt-3 rounded-[10px] border border-hair bg-panel2 px-3 py-2">
        <span className="section-label">Next action</span>
        <p className="mt-0.5 text-[13px] text-warm">{task.nextAction}</p>
      </div>

      {isCanfeed && (
        <>
          <div className="mt-4">
            <span className="section-label">Production checklist</span>
            <ul className="mt-2 space-y-1.5">
              {canfeedProductionChecklist.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[12px] text-mute">
                  <span className="h-3 w-3 rounded-[3px] border border-hair" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <span className="section-label">Claim restrictions</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {canfeedClaims.blocked.slice(0, 6).map((c) => (
                <span
                  key={c}
                  className="rounded border border-red-400/30 bg-red-400/10 px-1.5 py-0.5 text-[10px] text-red-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <span className="section-label">Related signals</span>
        <ul className="mt-2 space-y-1.5">
          {relatedSignals.length ? (
            relatedSignals.map((s) => (
              <li key={s.id} className="text-[12px] leading-snug text-mute">
                • {s.title} <span className="text-mute2">({s.decision})</span>
              </li>
            ))
          ) : (
            <li className="text-[12px] text-mute2">No related signals.</li>
          )}
        </ul>
      </div>

      {/* Buttons — visual only */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <PanelBtn label="Open Brief" primary />
        <PanelBtn label="Move Status" />
        <PanelBtn label="Defer" />
        <PanelBtn label="Mark Done" />
      </div>
      <p className="meta mt-3">Buttons are visual only in this prototype.</p>
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

function PanelBtn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <button
      className={`rounded-[10px] border px-3 py-2 text-[12px] ${
        primary
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-hair bg-panel2 text-mute hover:text-warm'
      }`}
    >
      {label}
    </button>
  )
}

export default function TaskBoard() {
  const [selectedId, setSelectedId] = useState<string>('canfeed-protect-pack')
  const selected = tasks.find((t) => t.id === selectedId) ?? tasks[0]

  return (
    <>
      <PageHeader
        title="Task Board"
        subtitle="AnimalFood · operational pipeline"
        chip={<Chip tone="gray">{tasks.length} tasks</Chip>}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Board */}
        <div className="min-w-0 flex-1">
          <div className="scroll-thin overflow-x-auto pb-3">
            <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
              {COLUMNS.map((col) => {
                const colTasks = tasks.filter((t) => t.estado === col)
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
                            selected={t.id === selectedId}
                            onSelect={() => setSelectedId(t.id)}
                          />
                        ))
                      ) : (
                        <div className="rounded-[10px] border border-dashed border-hair px-3 py-5 text-center">
                          <p className="text-[11px] text-mute2">No tasks in this state</p>
                          <p className="mt-0.5 text-[10px] text-mute2/70">
                            Tasks moved here will appear below.
                          </p>
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
            Scroll horizontally to see all states. Select a card to inspect it on the right.
          </p>
        </div>

        {/* Detail */}
        <DetailPanel task={selected} />
      </div>
    </>
  )
}

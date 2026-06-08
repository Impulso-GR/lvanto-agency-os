import { Link } from 'react-router-dom'
import {
  canfeedProductionChecklist,
  decisions,
  notifications,
  tasks,
} from '../data/mockData'
import type { Estado, Task } from '../types'
import type { DecisionStatus } from '../i18n'
import { Chip, EmptyState, PageHeader, Panel, SectionTitle, estadoTone, priorityTone } from '../components/ui'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY_STATUS: Record<string, Estado> = {}
const EMPTY_DEC: Record<string, DecisionStatus> = {}
const EMPTY_CHECK: Record<string, boolean> = {}
const EMPTY_READ: Record<string, boolean> = {}

const PR: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 }
const TERMINAL = new Set<Estado>(['Publicado', 'Medido', 'Descartado', 'Pausado'])

export default function Hoy() {
  const [overrides] = useLocalState<Record<string, Estado>>(KEYS.taskStatus, EMPTY_STATUS)
  const [decStatus] = useLocalState<Record<string, DecisionStatus>>(KEYS.decisionStatus, EMPTY_DEC)
  const [check] = useLocalState<Record<string, boolean>>(KEYS.canfeedChecklist, EMPTY_CHECK)
  const [read] = useLocalState<Record<string, boolean>>(KEYS.notifRead, EMPTY_READ)

  const estadoOf = (t: Task): Estado => overrides[t.id] ?? t.estado
  const active = (t: Task) => !TERMINAL.has(estadoOf(t))

  const priorities = [...tasks]
    .filter(active)
    .sort((a, b) => (PR[a.prioridad] ?? 9) - (PR[b.prioridad] ?? 9))
    .slice(0, 3)

  const gonzaloNext = [...tasks]
    .filter((t) => active(t) && t.owner.includes('Gonzalo'))
    .sort((a, b) => (PR[a.prioridad] ?? 9) - (PR[b.prioridad] ?? 9))[0]
  const aranzaNext = tasks.find((t) => active(t) && t.owner.toLowerCase().includes('aranza'))

  const blocked = tasks.filter((t) => estadoOf(t) === 'Pausado')
  const decisionsPending = decisions.filter((d) => (decStatus[d.id] ?? 'Pendiente') === 'Pendiente')
  const unread = notifications.filter((n) => !read[n.id]).length

  const canfeedDone = canfeedProductionChecklist.filter((s) => check[s]).length
  const canfeedTotal = canfeedProductionChecklist.length

  return (
    <>
      <PageHeader
        title="Hoy · Operación diaria"
        subtitle="Qué necesita acción ahora · datos locales/mock"
        chip={<Chip tone="accent">AnimalFood</Chip>}
      />

      {/* QUÉ HACER AHORA — single clear next move */}
      <div className="mb-6 overflow-hidden rounded-xl2 border border-accent/40 bg-accent/[0.05]">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="section-label text-accent">Qué hacer ahora</div>
            <h2 className="mt-1 text-lg font-semibold text-warm">
              Diseñar Canfeed: S1 Portada + S4 héroe Protect Pack
            </h2>
            <p className="mt-1 text-sm text-mute">
              Pieza activa #1 (Alta · En diseño). Bloquea la base PSD reutilizable para los pilares.
            </p>
          </div>
          <Link
            to="/clients/animalfood/brands/canfeed"
            className="shrink-0 rounded-[10px] border border-accent/50 bg-accent/15 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/25"
          >
            Abrir panel Canfeed →
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-accent/20 bg-carbon/30 px-5 py-2 font-mono text-[11px] text-mute">
          <span>Producción Canfeed: {canfeedDone}/{canfeedTotal} listo</span>
          <span>Decisiones pendientes: {decisionsPending.length}</span>
          <span>Notificaciones sin leer: {unread}</span>
          <span>Bloqueadas: {blocked.length}</span>
        </div>
      </div>

      {/* Priorities + owner next actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle right={<Chip tone="gray">top 3</Chip>}>Prioridades de hoy</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {priorities.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5">
                <Chip tone={priorityTone(t.prioridad)}>{t.prioridad}</Chip>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-warm">{t.title}</p>
                  <p className="meta truncate">{t.brand} · {t.nextAction}</p>
                </div>
                <Chip tone={estadoTone(estadoOf(t))}>{estadoOf(t)}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-3">
          <Panel>
            <SectionTitle>Próxima acción</SectionTitle>
            <OwnerNext who="Gonzalo" task={gonzaloNext} />
            <div className="my-3 h-px bg-white/[0.05]" />
            <OwnerNext who="Aranza" task={aranzaNext} />
          </Panel>
        </div>
      </div>

      {/* Blocked + decisions */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel>
          <SectionTitle right={<Chip tone={blocked.length ? 'amber' : 'gray'}>{blocked.length}</Chip>}>
            Bloqueadas
          </SectionTitle>
          {blocked.length ? (
            <ul className="space-y-2">
              {blocked.map((t) => (
                <li key={t.id} className="rounded-[10px] border border-hair bg-panel2 p-3">
                  <p className="text-[13px] text-warm">{t.title}</p>
                  <p className="meta mt-0.5">{t.nextAction}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Nada bloqueado" />
          )}
          <p className="meta mt-3">También en espera: Enercat (necesita datos) · wet/pouch/snack (bloqueado/futuro).</p>
        </Panel>

        <Panel>
          <SectionTitle right={<Link to="/decisions" className="meta hover:text-warm">Abrir →</Link>}>
            Decisiones pendientes
          </SectionTitle>
          {decisionsPending.length ? (
            <ul className="space-y-2">
              {decisionsPending.map((d) => (
                <li key={d.id} className="flex items-center gap-2 rounded-[10px] border border-hair bg-panel2 p-3">
                  <Chip tone={d.urgency === 'High' ? 'red' : d.urgency === 'Medium' ? 'amber' : 'gray'}>
                    {d.urgency === 'High' ? 'Alta' : d.urgency === 'Medium' ? 'Media' : 'Baja'}
                  </Chip>
                  <span className="text-[13px] text-warm">{d.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Sin decisiones pendientes" hint="Resueltas localmente en este navegador." />
          )}
        </Panel>

        <Panel>
          <SectionTitle right={<Link to="/metrics" className="meta hover:text-warm">Abrir →</Link>}>
            Recordatorio de métricas
          </SectionTitle>
          <EmptyState
            title="05 · MÉTRICAS vacío"
            hint="Aranza: cargar reach / guardados / compartidos / comentarios a mano. Sin datos no se valida nada."
          />
        </Panel>
      </div>

      <p className="meta mt-6">
        Leyenda: esta vista usa datos mock/localStorage. Las acciones aquí son indicativas; no hay
        conexión con Google Sheets, Meta ni ningún servicio externo.
      </p>
    </>
  )
}

function OwnerNext({ who, task }: { who: string; task?: Task }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-panel2 text-[11px] text-warm">
          {who[0]}
        </span>
        <span className="text-sm font-medium text-warm">{who}</span>
      </div>
      {task ? (
        <div className="mt-2 rounded-[10px] border border-hair bg-panel2 p-3">
          <p className="text-[13px] text-warm">{task.title}</p>
          <p className="meta mt-0.5">{task.nextAction}</p>
        </div>
      ) : (
        <p className="meta mt-2">Sin acción asignada.</p>
      )}
    </div>
  )
}

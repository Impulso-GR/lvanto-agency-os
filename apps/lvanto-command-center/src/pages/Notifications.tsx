import { notifications } from '../data/mockData'
import type { Notification } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle, severityTone } from '../components/ui'
import { sevLabel } from '../i18n'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY_READ: Record<string, boolean> = {}
const order: Notification['severity'][] = ['High', 'Medium', 'Low', 'System']

export default function Notifications() {
  const [read, setRead] = useLocalState<Record<string, boolean>>(KEYS.notifRead, EMPTY_READ)
  const unread = notifications.filter((n) => !read[n.id]).length

  const markRead = (id: string) => setRead((prev) => ({ ...prev, [id]: true }))
  const markAll = () =>
    setRead(() => Object.fromEntries(notifications.map((n) => [n.id, true])))

  return (
    <>
      <PageHeader
        title="Centro de notificaciones"
        subtitle="Agrupadas por prioridad"
        chip={<Chip tone={unread ? 'accent' : 'gray'}>{unread} sin leer</Chip>}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="meta">Acción local de prototipo · no genera efectos externos.</p>
        <button
          type="button"
          onClick={markAll}
          className="rounded-[10px] border border-hair bg-panel2 px-3 py-1.5 text-[12px] text-mute hover:text-warm hover:border-white/15"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="space-y-6">
        {order.map((sev) => {
          const items = notifications.filter((n) => n.severity === sev)
          if (!items.length) return null
          return (
            <Panel key={sev}>
              <SectionTitle right={<Chip tone={sev === 'System' ? 'gray' : severityTone(sev)}>{items.length}</Chip>}>
                {sevLabel[sev]}
              </SectionTitle>
              <ul className="divide-y divide-white/[0.05]">
                {items.map((n) => {
                  const isRead = !!read[n.id]
                  return (
                    <li
                      key={n.id}
                      className={`flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 ${isRead ? 'opacity-55' : ''}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${isRead ? 'bg-mute2' : 'bg-accent'}`}
                        title={isRead ? 'Leída' : 'Sin leer'}
                      />
                      <span className="min-w-0 flex-1 text-sm text-warm">{n.title}</span>
                      <span className="meta">{n.scope}</span>
                      <span className="meta">{n.owner}</span>
                      <span className="rounded border border-hair px-2 py-0.5 text-[11px] text-mute">
                        {n.action}
                      </span>
                      {isRead ? (
                        <Chip tone="gray">Leída</Chip>
                      ) : (
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] text-accent hover:bg-accent/15"
                        >
                          Marcar como leída
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Panel>
          )
        })}
      </div>
    </>
  )
}

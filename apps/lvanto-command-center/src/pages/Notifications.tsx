import { notifications } from '../data/mockData'
import type { Notification } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle, severityTone } from '../components/ui'

const order: Notification['severity'][] = ['High', 'Medium', 'Low', 'System']

export default function Notifications() {
  return (
    <>
      <PageHeader
        title="Notification Center"
        subtitle="Grouped by priority"
        chip={<Chip tone="gray">{notifications.length}</Chip>}
      />

      <div className="space-y-6">
        {order.map((sev) => {
          const items = notifications.filter((n) => n.severity === sev)
          if (!items.length) return null
          return (
            <Panel key={sev}>
              <SectionTitle right={<Chip tone={sev === 'System' ? 'gray' : severityTone(sev)}>{items.length}</Chip>}>
                {sev}
              </SectionTitle>
              <ul className="divide-y divide-white/[0.05]">
                {items.map((n) => (
                  <li key={n.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                    <Chip tone={sev === 'System' ? 'gray' : severityTone(sev)}>{sev}</Chip>
                    <span className="min-w-0 flex-1 text-sm text-warm">{n.title}</span>
                    <span className="meta">{n.scope}</span>
                    <span className="meta">{n.owner}</span>
                    <span className="rounded border border-hair px-2 py-0.5 text-[11px] text-mute">
                      {n.action}
                    </span>
                    <Chip tone="gray">{n.status}</Chip>
                  </li>
                ))}
              </ul>
            </Panel>
          )
        })}
      </div>
    </>
  )
}

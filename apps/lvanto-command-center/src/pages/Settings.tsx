import { settingsInfo } from '../data/mockData'
import { Chip, PageHeader, Panel, SectionTitle } from '../components/ui'

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Static configuration — read-only"
        chip={<Chip tone="gray">static</Chip>}
      />

      <Panel>
        <SectionTitle>Workspace</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {settingsInfo.map((s) => (
            <div
              key={s.k}
              className="flex items-center justify-between rounded-[10px] border border-hair bg-panel2 px-3 py-2.5"
            >
              <span className="section-label">{s.k}</span>
              <span
                className={`text-[13px] ${
                  s.tone === 'off' ? 'text-mute2' : s.tone === 'ok' ? 'text-emerald-300' : 'text-warm'
                }`}
              >
                {s.v}
              </span>
            </div>
          ))}
        </div>
        <p className="meta mt-3">
          No settings are writable in this prototype. Integrations are blocked by design; data mode is
          mock/static.
        </p>
      </Panel>
    </>
  )
}

import { Link } from 'react-router-dom'
import { canfeedClaims, canfeedProductionChecklist, signals } from '../data/mockData'
import { Chip, EmptyState, PageHeader, Panel, SectionTitle } from '../components/ui'
import { useLocalState, KEYS } from '../state/localStore'

const EMPTY_CHECK: Record<string, boolean> = {}

const canfeedSignals = signals.filter(
  (s) => s.brands.toLowerCase().includes('canfeed') || s.brands === 'All brands',
)

function ClaimList({ title, items, tone }: { title: string; items: string[]; tone: 'green' | 'red' | 'amber' }) {
  const dot = tone === 'green' ? 'bg-emerald-400' : tone === 'red' ? 'bg-red-400' : 'bg-amber-400'
  return (
    <div className="rounded-[10px] border border-hair bg-panel2 p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="section-label">{title}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map((c) => (
          <li key={c} className="text-[12px] leading-snug text-mute">{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default function CanfeedDashboard() {
  const [checked, setChecked] = useLocalState<Record<string, boolean>>(KEYS.canfeedChecklist, EMPTY_CHECK)
  const toggle = (step: string) => setChecked((prev) => ({ ...prev, [step]: !prev[step] }))

  return (
    <>
      <div className="mb-1">
        <Link to="/clients/animalfood" className="meta hover:text-warm">← Espacio de trabajo AnimalFood</Link>
      </div>
      <PageHeader
        title="Canfeed — Panel de marca"
        subtitle="Alimento premium para perro · Five S Plus · Educación basada en evidencia"
        chip={<Chip tone="accent">Premium</Chip>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle right={<Chip tone="amber">En diseño</Chip>}>Módulo de producción activo</SectionTitle>
          <div className="rounded-[10px] border border-accent/30 bg-accent/[0.04] p-4">
            <h3 className="text-base font-medium text-warm">Protect Pack × Five S Plus</h3>
            <p className="mt-1 text-sm text-mute">Pieza puente + PSD base reutilizable</p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
              <Meta k="Estado" v="En diseño" />
              <Meta k="Prioridad" v="Alta" />
              <Meta k="Responsable" v="Gonzalo → Aranza" />
              <Meta k="Objetivo" v="Hoy / semana" />
            </div>
            <div className="mt-4 rounded-[8px] border border-hair bg-panel px-3 py-2">
              <span className="section-label">Próxima acción</span>
              <p className="mt-0.5 text-sm text-warm">Diseñar S1 Portada + S4 héroe Protect Pack</p>
            </div>
          </div>

          {/* Local toggleable production checklist */}
          <div className="mt-4">
            <SectionTitle right={<Chip tone="gray">solo visual</Chip>}>Checklist de producción</SectionTitle>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {canfeedProductionChecklist.map((step) => {
                const on = !!checked[step]
                return (
                  <li key={step}>
                    <button
                      type="button"
                      onClick={() => toggle(step)}
                      className="flex w-full items-center gap-2 rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-left hover:border-white/15"
                    >
                      <span className={`grid h-3.5 w-3.5 place-items-center rounded-[4px] border ${on ? 'border-accent bg-accent/20 text-accent' : 'border-hair'}`}>
                        {on && <span className="text-[9px] leading-none">✓</span>}
                      </span>
                      <span className={`text-[13px] ${on ? 'text-warm line-through' : 'text-mute'}`}>{step}</span>
                      <span className="meta ml-auto">{on ? 'listo' : 'pendiente'}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="meta mt-3">Checklist local de producción. No modifica Google Sheets.</p>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <SectionTitle>Cola de acciones</SectionTitle>
            <div className="space-y-2">
              <QueueBtn label="Diseñar S1 Portada" />
              <QueueBtn label="Diseñar S4 héroe Protect Pack" />
              <QueueBtn label="Armar PSD base reutilizable" />
              <QueueBtn label="Exportar PNGs (1080×1350)" />
            </div>
            <p className="meta mt-3">Botones solo visuales en este prototipo.</p>
          </Panel>

          <Panel>
            <SectionTitle>Dirección visual</SectionTitle>
            <ul className="space-y-1.5 text-[12px] text-mute">
              <li>Golden-hour documental · estilo Tim Flach</li>
              <li>Packshot real — nunca packaging inventado</li>
              <li>#1E5A8E info · #B8732D Protect Pack / CTA</li>
              <li>Sans humanista crema en mayúsculas</li>
              <li>Restraint premium · espacio en blanco</li>
            </ul>
          </Panel>
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle right={<Chip tone="gold">seguridad</Chip>}>Control de claims</SectionTitle>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <ClaimList title="Permitido" items={canfeedClaims.allowed} tone="green" />
          <ClaimList title="Bloqueado" items={canfeedClaims.blocked} tone="red" />
          <ClaimList title="Necesita datos" items={canfeedClaims.needsData} tone="amber" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionTitle>Señales estratégicas</SectionTitle>
          <ul className="divide-y divide-white/[0.05]">
            {canfeedSignals.map((s) => (
              <li key={s.id} className="py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm">{s.title}</span>
                  <Chip tone="gray">{s.decision}</Chip>
                </div>
                <p className="meta mt-0.5">{s.meaning}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle>Métricas</SectionTitle>
          <EmptyState title="Todavía no hay métricas" hint="Cargar manualmente en 05 · MÉTRICAS." />
        </Panel>
      </div>
    </>
  )
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="section-label">{k}</div>
      <div className="mt-0.5 text-[13px] text-warm">{v}</div>
    </div>
  )
}

function QueueBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="Solo visual — sin acción en este prototipo"
      className="flex w-full cursor-not-allowed items-center justify-between rounded-[10px] border border-hair bg-panel2 px-3 py-2 text-left text-[13px] text-mute opacity-70"
    >
      {label}
      <span className="text-mute2">→</span>
    </button>
  )
}

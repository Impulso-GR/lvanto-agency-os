import { Chip, PageHeader, Panel, SectionTitle } from '../components/ui'
import { resetLocalData } from '../state/localStore'

const rows: { k: string; v: string; tone?: 'ok' | 'off' }[] = [
  { k: 'Usuario', v: 'Gonzalo' },
  { k: 'Rol', v: 'Admin' },
  { k: 'Espacio de trabajo', v: 'Lvanto' },
  { k: 'Cliente activo', v: 'AnimalFood' },
  { k: 'Modo', v: 'Prototipo local', tone: 'ok' },
  { k: 'Fuente de datos', v: 'Mock / localStorage', tone: 'off' },
  { k: 'Integraciones', v: 'Bloqueadas', tone: 'off' },
  { k: 'Tema', v: 'Oscuro', tone: 'ok' },
  { k: 'Entorno', v: 'Local', tone: 'ok' },
]

export default function Settings() {
  const reset = () => {
    const ok = window.confirm(
      '¿Resetear todos los datos locales del prototipo? Se borrará el estado guardado (notificaciones, decisiones, tareas, checklists) y se recargará la página.',
    )
    if (ok) {
      resetLocalData()
      window.location.reload()
    }
  }

  return (
    <>
      <PageHeader
        title="Configuración"
        subtitle="Configuración estática — solo lectura (prototipo)"
        chip={<Chip tone="gray">prototipo local</Chip>}
      />

      <Panel>
        <SectionTitle>Espacio de trabajo</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rows.map((s) => (
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
      </Panel>

      <Panel className="mt-6 border-red-400/20">
        <SectionTitle>Datos locales</SectionTitle>
        <p className="text-[13px] text-mute">
          El estado del prototipo (notificaciones leídas, decisiones, estados de tareas, checklists) vive en
          localStorage. Podés borrarlo para empezar de cero.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-[10px] border border-red-400/30 bg-red-400/10 px-3 py-2 text-[12px] text-red-300 hover:bg-red-400/15"
        >
          Resetear datos locales
        </button>
      </Panel>
    </>
  )
}

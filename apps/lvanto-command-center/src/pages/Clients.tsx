import { Link } from 'react-router-dom'
import { clients } from '../data/mockData'
import { Chip, PageHeader, SectionTitle } from '../components/ui'

export default function Clients() {
  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Todos los espacios de trabajo de Lvanto"
        chip={<Chip tone="gray">{clients.length} clientes</Chip>}
      />

      <SectionTitle right={<Chip tone="green">1 activo</Chip>}>Espacios de trabajo</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((c) => {
          const active = c.status === 'Active'
          if (!active) {
            return (
              <div
                key={c.id}
                className="rounded-xl2 border border-dashed border-hair bg-white/[0.01] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mute">{c.name}</span>
                  <Chip tone="gray">Inactivo</Chip>
                </div>
                <p className="mt-3 text-xs text-mute2">No incorporado</p>
                <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-mute2">
                  <span>— marcas</span>
                  <span>— tareas</span>
                  <span>— alertas</span>
                </div>
              </div>
            )
          }
          return (
            <Link
              key={c.id}
              to="/clients/animalfood"
              className="relative block rounded-xl2 border border-hair bg-panel2 p-4 transition-colors hover:border-white/15"
            >
              <span className="absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-warm">{c.name}</span>
                <Chip tone="green">Activo</Chip>
              </div>
              <p className="meta mt-1">Espacio de trabajo abierto</p>
              <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-mute">
                <span>{c.brands} marcas</span>
                <span>{c.openTasks} tareas</span>
                <span className="text-amber-300">⚠ {c.alerts}</span>
              </div>
              <div className="mt-3 text-[11px] text-accent">Abrir espacio →</div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

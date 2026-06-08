import { useState } from 'react'
import { reports } from '../data/mockData'
import { ActionButton, Chip, PageHeader, SectionTitle } from '../components/ui'

export default function Reports() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        title="Informes"
        subtitle="Plantillas de informe — la generación real está bloqueada"
        chip={<Chip tone="gray">{reports.length} plantillas</Chip>}
      />

      <SectionTitle>Plantillas disponibles</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {reports.map((r) => {
          const open = openId === r.id
          return (
            <div key={r.id} className="rounded-xl2 border border-hair bg-panel2 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-warm">{r.title}</h3>
                <Chip tone="gray">placeholder</Chip>
              </div>
              <p className="mt-1 text-[13px] text-mute">{r.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : r.id)}
                  className="rounded-[10px] border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] text-accent hover:bg-accent/15"
                >
                  {open ? 'Ocultar vista previa' : 'Previsualizar informe'}
                </button>
                <ActionButton label="Exportar" />
              </div>

              {open && (
                <div className="mt-3 rounded-[10px] border border-hair bg-panel px-3 py-3">
                  <span className="section-label">Vista previa (estática)</span>
                  <ul className="mt-2 space-y-1 text-[12px] text-mute">
                    <li>• Resumen: {r.desc}</li>
                    <li>• Período: junio 2026 (mock)</li>
                    <li>• Datos: localStorage / mock — sin fuente en vivo</li>
                  </ul>
                  <p className="meta mt-2">Generación real de archivos bloqueada en este prototipo.</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="meta mt-4">La generación de archivos reales está bloqueada — vista previa estática solamente.</p>
    </>
  )
}

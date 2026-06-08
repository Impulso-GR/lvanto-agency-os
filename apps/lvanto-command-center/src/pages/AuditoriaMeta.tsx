import { Chip, PageHeader, Panel, SectionTitle } from '../components/ui'

const usable = [
  'Tono de voz por marca (alineado al Brand Registry)',
  'Kits visuales distintos Canfeed vs IronPet (anti-canibalización)',
  'Mecánicas de comunidad (El Detective / ¿De qué tropa sos? / Socio del mes)',
  'Contenido B2B "para el mostrador" (seller-enablement, claim-safe)',
  'Pilares de contenido (Canfeed / IronPet / AnimalFood)',
]

const blocked = [
  'Enercan "antes/después salud"',
  '"hipoalergénico" / "antiinflamatorio" como claim',
  'Quizzes que impliquen un beneficio ("ayuda a todos los perros")',
  'Tabla de scoring como dato real',
  'Claims de performance de IronPet sin validar',
]

const needsData = [
  'Bio Enercan "monoproteína de cerdo + cúrcuma" → ficha técnica',
  'Líneas / gramajes de producto (sin húmedo/snack)',
  'Stats de plataforma de Meta AI (3× comentarios, >70% retención)',
  'AnimalFood "3 marcas" subestima el portafolio',
  'Calendario 30 días (Meta AI entregó solo Semana 1)',
]

export default function AuditoriaMeta() {
  return (
    <>
      <PageHeader
        title="Auditoría Meta (sensor)"
        subtitle="Entrada estratégica filtrada — no es fuente de verdad"
        chip={<Chip tone="amber">Hipótesis</Chip>}
      />

      <Panel className="mb-6 border-amber-400/20 bg-amber-400/[0.03]">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="amber">Hipótesis</Chip>
          <Chip tone="amber">Necesita validación</Chip>
          <Chip tone="red">No es fuente de verdad</Chip>
          <Chip tone="red">No publicar sin pasar por Control de claims</Chip>
        </div>
        <p className="mt-3 text-[13px] text-mute">
          Meta AI es un sensor creativo/de plataforma supervisado. Toda idea pasa por Brand Registry →
          Control de claims → estándar de contenido antes de producirse. Resumen estático de la auditoría
          del 2026-06-08 (ver doc: animalfood-meta-ai-audit-gate-2026-06-08).
        </p>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel>
          <SectionTitle right={<Chip tone="green">{usable.length}</Chip>}>Usable ahora (Use / Adapt)</SectionTitle>
          <ul className="space-y-1.5 text-[12px] text-mute">
            {usable.map((x) => <li key={x}>• {x}</li>)}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle right={<Chip tone="red">{blocked.length}</Chip>}>Rechazado / bloqueado</SectionTitle>
          <ul className="space-y-1.5 text-[12px] text-mute">
            {blocked.map((x) => <li key={x}>• {x}</li>)}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle right={<Chip tone="amber">{needsData.length}</Chip>}>Necesita datos</SectionTitle>
          <ul className="space-y-1.5 text-[12px] text-mute">
            {needsData.map((x) => <li key={x}>• {x}</li>)}
          </ul>
        </Panel>
      </div>

      <p className="meta mt-6">
        No se construye el calendario de 30 días hasta confirmar fichas técnicas, líneas de producto e
        historia de Enercan. Las puntuaciones y stats de Meta AI son hipótesis, no hechos.
      </p>
    </>
  )
}

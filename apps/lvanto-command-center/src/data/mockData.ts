import type {
  ActivityItem,
  AlertItem,
  Brand,
  Client,
  HealthTile,
  Signal,
  Task,
} from '../types'

// ---------------------------------------------------------------------------
// STATIC MOCK DATA ONLY — no live source, no Sheets, no backend.
// Reflects the documented current state of the AnimalFood workspace so the
// prototype reads realistically. Nothing here is wired to anything.
// ---------------------------------------------------------------------------

export const clients: Client[] = [
  {
    id: 'animalfood',
    name: 'AnimalFood',
    status: 'Active',
    brands: 9,
    openTasks: 3,
    alerts: 2,
    note: 'First active workspace',
  },
  { id: 'broker-capital', name: 'Broker Capital', status: 'Inactive', note: 'Not onboarded yet' },
  { id: 'vigilarg', name: 'VigilArg', status: 'Inactive', note: 'Not onboarded yet' },
  { id: 'sileoni', name: 'Sileoni', status: 'Inactive', note: 'Not onboarded yet' },
]

export const animalfoodBrands: Brand[] = [
  {
    id: 'animalfood-argentina',
    name: 'AnimalFood Argentina',
    role: 'Institutional umbrella',
    lane: 'Institutional',
    account: '@animalfoodargentina',
    status: 'Active',
    note: 'Mother brand · respalda the family of brands',
  },
  {
    id: 'canfeed',
    name: 'Canfeed',
    role: 'Super-premium · evidence education',
    lane: 'Premium',
    account: '@canfeed.ar',
    status: 'Active',
    priority: 'Alta',
    note: 'Five S Plus / Protect Pack · active production priority',
  },
  {
    id: 'catfeed',
    name: 'Catfeed',
    role: 'Premium feline-specific',
    lane: 'Premium (feline)',
    account: '@canfeed.ar',
    status: 'Active',
    note: 'Feline distinctiveness · do not cite +6% YoY',
  },
  {
    id: 'ironpet',
    name: 'IronPet',
    role: 'Accessible performance / community',
    lane: 'Accessible / value',
    account: '@ironpet.ar',
    status: 'Active',
    note: 'Owned brand · keep distinct from Canfeed',
  },
  {
    id: 'enercan',
    name: 'Enercan',
    role: 'Functional accessible',
    lane: 'Functional',
    account: '@enercan.ar',
    status: 'Dormant',
    note: 'Direction approved (pork + turmeric) · pending objective',
  },
  {
    id: 'enercat',
    name: 'Enercat',
    role: 'Feline functional (undefined)',
    lane: 'Needs data',
    account: '@enercan.ar',
    status: 'Needs data',
    note: 'Ingredient data unconfirmed · do not invent',
  },
  {
    id: 'puro',
    name: 'Puro',
    role: 'Economic / value',
    lane: 'Economic',
    status: 'Economic-value',
    note: 'Owned value brand · specs needs data',
  },
  {
    id: 'superpet',
    name: 'SuperPet',
    role: 'Economic / value',
    lane: 'Economic',
    status: 'Economic-value',
    note: 'Owned value brand · specs needs data',
  },
  {
    id: 'ulyses',
    name: 'Ulyses',
    role: 'Economic / value · low visibility',
    lane: 'Economic',
    status: 'Needs data',
    note: 'Minimal presence · confirm role',
  },
]

export const tasks: Task[] = [
  {
    id: 'canfeed-protect-pack',
    title: 'Canfeed Protect Pack × Five S Plus',
    client: 'AnimalFood',
    brand: 'Canfeed',
    estado: 'En diseño',
    prioridad: 'Alta',
    owner: 'Gonzalo → Aranza',
    nextAction: 'Design S1 Cover + S4 Protect Pack hero',
    flag: 'Active production',
    carryOver: true,
  },
  {
    id: 'ironpet-community',
    title: 'IronPet Community Post',
    client: 'AnimalFood',
    brand: 'IronPet',
    estado: 'Idea',
    prioridad: 'Media',
    owner: 'Aranza (after approval)',
    nextAction: 'Publish after Gonzalo approval · reply by pet name',
    flag: 'Needs Gonzalo approval',
  },
  {
    id: 'manual-metrics',
    title: 'Manual Metrics Capture',
    client: 'AnimalFood',
    brand: 'All brands',
    estado: 'Brief listo',
    prioridad: 'Media',
    owner: 'Aranza',
    nextAction: 'Capture real saves/shares into 05 · MÉTRICAS',
    flag: '05 · MÉTRICAS empty',
  },
  {
    id: 'enercan-objective',
    title: 'Enercan Objective',
    client: 'AnimalFood',
    brand: 'Enercan',
    estado: 'Idea',
    prioridad: 'Media',
    owner: 'Gonzalo',
    nextAction: 'Define one concrete commercial objective',
    flag: 'Pending objective',
  },
  {
    id: 'catfeed-no-perro-chico',
    title: 'Catfeed — “Tu gato no es un perro chico”',
    client: 'AnimalFood',
    brand: 'Catfeed',
    estado: 'Brief listo',
    prioridad: 'Alta',
    owner: 'Gonzalo',
    nextAction: 'Confirm if designed · do NOT cite +6% YoY',
    flag: 'Needs validation',
    carryOver: true,
  },
  {
    id: 'institutional-repost',
    title: 'Institutional repost (placa Canfeed)',
    client: 'AnimalFood',
    brand: 'AnimalFood Argentina',
    estado: 'Pausado',
    prioridad: 'Baja',
    owner: '—',
    nextAction: 'Do not carry over · dependency-blocked on Pilar 1 placa',
    flag: 'Paused',
  },
]

export const signals: Signal[] = [
  {
    id: 'ml-price-ladder',
    title: 'MercadoLibre price-positioning / portfolio ladder',
    confidence: 'Medium-high',
    risk: 'Medium',
    brands: 'Canfeed / IronPet',
    decision: 'Adapt / Monitor',
    meaning: 'Value-defense narrative for Canfeed (system/evidence, never price).',
  },
  {
    id: 'ironpet-positioning',
    title: 'IronPet internal positioning',
    confidence: 'Medium',
    risk: 'Medium',
    brands: 'Canfeed / IronPet',
    decision: 'Adapt / Monitor',
    meaning: 'Keep IronPet distinct — avoid eroding Canfeed premium.',
  },
  {
    id: 'manufacturer-vs-retailer',
    title: 'Manufacturer-led vs retailer-led',
    confidence: 'Medium',
    risk: 'Low',
    brands: 'All brands',
    decision: 'Adapt (no spend)',
    meaning: 'Teach / evidence framing, not a price war.',
  },
  {
    id: 'wet-pouch-snack',
    title: 'Wet / pouch / snack',
    confidence: 'Medium',
    risk: 'Medium',
    brands: 'All brands',
    decision: 'Blocked / future',
    meaning: 'No known product — never imply it exists.',
  },
  {
    id: 'cat-plus-6',
    title: 'Cat +6% YoY (unverified)',
    confidence: 'Low',
    risk: 'Low',
    brands: 'Catfeed',
    decision: 'Needs data',
    meaning: 'Source not found — never state as fact.',
  },
]

export const globalAlerts: AlertItem[] = [
  { id: 'a1', severity: 'High', title: 'Canfeed PSD still in design', owner: 'Gonzalo' },
  { id: 'a2', severity: 'Medium', title: '05 · MÉTRICAS empty', owner: 'Aranza' },
  { id: 'a3', severity: 'Medium', title: 'IronPet community post needs approval', owner: 'Gonzalo' },
  { id: 'a4', severity: 'Low', title: 'Enercat — Needs data', owner: 'Gonzalo' },
  { id: 'a5', severity: 'System', title: 'Sheets API intermittent · scheduler check', owner: 'Admin' },
]

export const systemHealth: HealthTile[] = [
  { label: 'Repository', status: 'Clean', tone: 'ok' },
  { label: 'Google Sheets', status: 'Read-only · intermittent', tone: 'warn' },
  { label: 'Scheduler', status: 'Unverified', tone: 'warn' },
  { label: 'Integrations', status: 'None connected', tone: 'off' },
  { label: 'Docs sync', status: 'Up to date', tone: 'ok' },
]

export const activity: ActivityItem[] = [
  { id: 'ac1', text: 'Brand registry created & pushed', when: 'recent' },
  { id: 'ac2', text: 'Canfeed rows 6 & 10 → En diseño', when: 'recent' },
  { id: 'ac3', text: 'Monday operating protocol added', when: 'recent' },
  { id: 'ac4', text: 'MercadoLibre price signal logged', when: 'recent' },
  { id: 'ac5', text: 'Visual prototype review v1 locked', when: 'recent' },
]

export const canfeedClaims = {
  allowed: [
    'Five S Plus · Salud Total',
    'The 5 pillar names',
    'Protect Pack official wording',
    'sabor / aroma / palatabilidad / integridad de nutrientes',
  ],
  blocked: [
    'humidity / oxygen barrier',
    'multicapa',
    'valve',
    'hermetic seal',
    'materials',
    'freshness days',
    'AAFCO certification',
    'unverified stats',
  ],
  needsData: ['body copy for future pillars', 'ISO scope', 'AAFCO wording if ever used'],
}

export const canfeedProductionChecklist = [
  'S1 Cover',
  'S4 Protect Pack hero',
  'PSD master',
  'PSD base (reusable)',
  'Export PNGs',
  'Handoff to Aranza',
]

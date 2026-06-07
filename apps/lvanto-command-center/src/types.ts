// Domain types for the Lvanto Command Center prototype (mock data only).

export type ClientStatus = 'Active' | 'Inactive'

export interface Client {
  id: string
  name: string
  status: ClientStatus
  brands?: number
  openTasks?: number
  alerts?: number
  note?: string
}

export type BrandStatus =
  | 'Active'
  | 'Dormant'
  | 'Needs data'
  | 'Economic-value'
  | 'Not active'

export type Priority = 'Alta' | 'Media' | 'Baja'

export interface Brand {
  id: string
  name: string
  role: string
  lane: string
  account?: string
  status: BrandStatus
  priority?: Priority
  note: string
}

export type Estado =
  | 'Idea'
  | 'Brief listo'
  | 'En diseño'
  | 'En revisión'
  | 'Aprobado'
  | 'Programado'
  | 'Publicado'
  | 'Medido'
  | 'Pausado'
  | 'Descartado'

export interface Task {
  id: string
  title: string
  client: string
  brand: string
  estado: Estado
  prioridad: Priority
  owner: string
  nextAction: string
  flag?: string
  carryOver?: boolean
}

export type Confidence = 'High' | 'Medium-high' | 'Medium' | 'Low'

export interface Signal {
  id: string
  title: string
  confidence: Confidence
  risk?: string
  brands: string
  decision: string
  meaning: string
}

export type AlertSeverity = 'High' | 'Medium' | 'Low' | 'System'

export interface AlertItem {
  id: string
  severity: AlertSeverity
  title: string
  owner: string
}

export interface HealthTile {
  label: string
  status: string
  tone: 'ok' | 'warn' | 'off'
}

export interface ActivityItem {
  id: string
  text: string
  when: string
}

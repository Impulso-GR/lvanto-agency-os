// Small display-label dictionaries (Spanish). Internal data values stay in their
// original form; these only translate what the UI renders.

export const sevLabel: Record<string, string> = {
  High: 'Alta',
  Medium: 'Media',
  Low: 'Baja',
  System: 'Sistema',
}

export const confLabel: Record<string, string> = {
  High: 'Alta',
  'Medium-high': 'Media-alta',
  Medium: 'Media',
  Low: 'Baja',
}

export const statusLabel: Record<string, string> = {
  Active: 'Activa',
  Dormant: 'Latente',
  'Needs data': 'Necesita datos',
  'Economic-value': 'Económico/valor',
  'Not active': 'Inactiva',
  Inactive: 'Inactivo',
}

export const laneLabel: Record<string, string> = {
  Institutional: 'Institucional',
  Premium: 'Premium',
  'Premium (feline)': 'Premium (felino)',
  Functional: 'Funcional',
  'Accessible / value': 'Accesible / valor',
  Economic: 'Económico',
  'Needs data': 'Necesita datos',
}

export const t = (dict: Record<string, string>, key: string) => dict[key] ?? key

// Decision (local prototype) statuses
export type DecisionStatus = 'Pendiente' | 'Revisada' | 'Aprobada' | 'Diferida'

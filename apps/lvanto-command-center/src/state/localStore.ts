import { useCallback, useSyncExternalStore } from 'react'

// ---------------------------------------------------------------------------
// Tiny localStorage-backed state for the PROTOTYPE only.
// No backend, no external services. All keys are namespaced and can be wiped
// with resetLocalData(). Components stay in sync via a minimal pub/sub so the
// TopBar badge updates when the Notifications page changes, etc.
// ---------------------------------------------------------------------------

const PREFIX = 'lcc:v0.4:'
const cache = new Map<string, unknown>()
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

function readRaw<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

// Cached snapshot so useSyncExternalStore gets a stable reference between renders.
function ensure<T>(key: string, fallback: T): T {
  if (!cache.has(key)) cache.set(key, readRaw(key, fallback))
  return cache.get(key) as T
}

function setLocal<T>(key: string, updater: T | ((prev: T) => T), fallback: T) {
  const prev = ensure(key, fallback)
  const next = typeof updater === 'function' ? (updater as (p: T) => T)(prev) : updater
  cache.set(key, next)
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(next))
  } catch {
    /* ignore quota / disabled storage */
  }
  emit()
}

/** Reactive local state hook. Pass a STABLE (module-level) fallback. */
export function useLocalState<T>(
  key: string,
  fallback: T,
): [T, (u: T | ((prev: T) => T)) => void] {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => ensure(key, fallback),
    () => fallback,
  )
  const set = useCallback((u: T | ((prev: T) => T)) => setLocal(key, u, fallback), [key])
  return [snapshot, set]
}

/** Wipe all prototype state and notify subscribers. */
export function resetLocalData() {
  try {
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(PREFIX)) toRemove.push(k)
    }
    toRemove.forEach((k) => localStorage.removeItem(k))
  } catch {
    /* ignore */
  }
  cache.clear()
  emit()
}

// Namespaced keys used across the app.
export const KEYS = {
  notifRead: 'notifRead',
  decisionStatus: 'decisionStatus',
  taskStatus: 'taskStatus',
  canfeedChecklist: 'canfeedChecklist',
  metricsChecklist: 'metricsChecklist',
} as const

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Shell() {
  return (
    <div className="flex h-screen overflow-hidden bg-carbon text-warm">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        {/* Global prototype banner — subtle, present on every screen */}
        <div className="flex items-center gap-2 border-b border-hair bg-panel/60 px-6 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute2">
            Prototipo local · datos mock/localStorage · sin integraciones reales
          </span>
        </div>
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

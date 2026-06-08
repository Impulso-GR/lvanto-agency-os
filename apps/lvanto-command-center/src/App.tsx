import { Routes, Route, Link } from 'react-router-dom'
import Shell from './components/Shell'
import Hoy from './pages/Hoy'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import AnimalFoodWorkspace from './pages/AnimalFoodWorkspace'
import CanfeedDashboard from './pages/CanfeedDashboard'
import TaskBoard from './pages/TaskBoard'
import Signals from './pages/Signals'
import AuditoriaMeta from './pages/AuditoriaMeta'
import Metrics from './pages/Metrics'
import Notifications from './pages/Notifications'
import Decisions from './pages/Decisions'
import Claims from './pages/Claims'
import PaidMedia from './pages/PaidMedia'
import Reports from './pages/Reports'
import SystemHealthPage from './pages/SystemHealthPage'
import Settings from './pages/Settings'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-lg text-warm">Pantalla todavía no implementada</p>
      <p className="mt-1 text-sm text-mute">Esta ruta es parte de una fase futura.</p>
      <Link
        to="/"
        className="mt-4 rounded-[10px] border border-hair bg-panel px-4 py-2 text-sm text-warm hover:border-white/15"
      >
        Volver al Panel principal
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/animalfood" element={<AnimalFoodWorkspace />} />
        <Route path="/clients/animalfood/brands/canfeed" element={<CanfeedDashboard />} />
        <Route path="/clients/animalfood/tasks" element={<TaskBoard />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/auditoria-meta" element={<AuditoriaMeta />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/paid-media" element={<PaidMedia />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/system-health" element={<SystemHealthPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

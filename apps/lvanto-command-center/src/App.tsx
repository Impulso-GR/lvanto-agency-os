import { Routes, Route, Link } from 'react-router-dom'
import Shell from './components/Shell'
import Dashboard from './pages/Dashboard'
import AnimalFoodWorkspace from './pages/AnimalFoodWorkspace'
import CanfeedDashboard from './pages/CanfeedDashboard'
import TaskBoard from './pages/TaskBoard'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-lg text-warm">Screen not implemented yet</p>
      <p className="mt-1 text-sm text-mute">This route is part of a future phase.</p>
      <Link
        to="/"
        className="mt-4 rounded-[10px] border border-hair bg-panel px-4 py-2 text-sm text-warm hover:border-white/15"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients/animalfood" element={<AnimalFoodWorkspace />} />
        <Route path="/clients/animalfood/brands/canfeed" element={<CanfeedDashboard />} />
        <Route path="/clients/animalfood/tasks" element={<TaskBoard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

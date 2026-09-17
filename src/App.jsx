import { Routes, Route } from 'react-router-dom'
import { AppStateProvider } from './state/AppState.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Upload from './screens/Upload.jsx'
import Reward from './screens/Reward.jsx'
import Opportunity from './screens/Opportunity.jsx'

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen bg-bg flex justify-center">
        <div className="w-full max-w-md min-h-screen bg-bg relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/reward" element={<Reward />} />
            <Route path="/opportunity" element={<Opportunity />} />
          </Routes>
        </div>
      </div>
    </AppStateProvider>
  )
}

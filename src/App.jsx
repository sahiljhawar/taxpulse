import { Routes, Route } from 'react-router-dom'
import { AppStateProvider } from './state/AppState.jsx'
import Dashboard from './screens/Dashboard.jsx'
import CheckIn from './screens/CheckIn.jsx'
import Result from './screens/Result.jsx'
import FrequencySettings from './screens/FrequencySettings.jsx'

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen bg-bg flex justify-center">
        <div className="w-full max-w-md min-h-screen bg-bg relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/result" element={<Result />} />
            <Route path="/settings" element={<FrequencySettings />} />
          </Routes>
        </div>
      </div>
    </AppStateProvider>
  )
}

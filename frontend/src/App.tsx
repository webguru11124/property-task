import './App.css'
import { AppProviders } from './providers/AppProviders'
import Home from './pages/Home'

function App() {
  return (
    <AppProviders>
      <Home />
    </AppProviders>
  )
}

export default App

import { ErrorBoundary } from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import { AppProviders } from './providers/AppProviders'

function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </AppProviders>
  )
}

export default App

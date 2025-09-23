import { AppProviders } from './providers/AppProviders'
import HomePage from './pages/HomePage'
import { ErrorBoundary } from './components/ErrorBoundary'

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

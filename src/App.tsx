import reactLogo from './assets/react.svg'
import './App.css'
import { FirestoreProvider, AuthProvider, useFirebaseApp, StorageProvider, AnalyticsProvider, FunctionsProvider } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getFunctions } from 'firebase/functions'

interface WelcomeProps {
  projectId: string
}

const WelcomeScreen = ({ projectId }: WelcomeProps) => (
  <div className="App">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>Vite + React</h1>
    <div className="card">
      <p>
        Edit <code>src/App.tsx</code> and save to live-reload!
      </p>
    </div>
    Firebase Project ID:
    <pre>
      <code>{projectId}</code>
    </pre>
  </div>
)

function App() {
  const firebaseApp = useFirebaseApp()
  return (
    <FirestoreProvider sdk={getFirestore(firebaseApp)}>
      <AuthProvider sdk={getAuth(firebaseApp)}>
        <StorageProvider sdk={getStorage(firebaseApp)}>
          <AnalyticsProvider sdk={getAnalytics(firebaseApp)}>
            <FunctionsProvider sdk={getFunctions(firebaseApp)}>
              <WelcomeScreen projectId={firebaseApp.options.projectId || ''} />
            </FunctionsProvider>
          </AnalyticsProvider>
        </StorageProvider>
      </AuthProvider>
    </FirestoreProvider>
  )
}

export default App

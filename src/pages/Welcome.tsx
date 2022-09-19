import reactLogo from '../assets/react.svg'
import firebaseLogo from '../assets/firebase.svg'
import { useFirebaseApp } from 'reactfire'
import { Link } from 'react-router-dom'

export const Welcome = () => {
  const firebaseApp = useFirebaseApp()
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://console.firebase.google.com" target="_blank">
          <img src={firebaseLogo} className="logo" alt="Firebase logo" />
        </a>
      </div>
      <h1>Vite + React + Firebase</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to live-reload!
        </p>
      </div>
      Firebase Project ID:
      <pre>
        <code>{firebaseApp.options.projectId || ""}</code>
      </pre>
      <Link to="/dooglers">See Dooglers 🐕</Link>
    </div>
  )
}

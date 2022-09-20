import dog from "../assets/dog.svg"
import { useFirebaseApp } from 'reactfire'
import { Link } from 'react-router-dom'

export const Welcome = () => {
  const firebaseApp = useFirebaseApp()
  return (
    <div className="App">
      <img src={dog}
        width={100}
      />
      <p style={{ fontSize: "3rem", marginTop: "2rem" }}>MyDoogler</p>
      Firebase Project ID:
      <pre>
        <code>{firebaseApp.options.projectId || ""}</code>
      </pre>
      <Link to="/dooglers">See Dooglers 🐕</Link>
    </div>
  )
}

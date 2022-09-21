import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyApGYY11hJ9Si3biVTEuL85qkPdZcgp_EA",
  authDomain: "my-doogler.firebaseapp.com",
  projectId: "my-doogler",
  storageBucket: "my-doogler.appspot.com",
  messagingSenderId: "749532526122",
  appId: "1:749532526122:web:f4b3258d8602bcb6cdf553",
  measurementId: "G-3XB8LSMX9T",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  FirestoreProvider,
  AuthProvider,
  useFirebaseApp,
  StorageProvider,
  AnalyticsProvider,
  FunctionsProvider,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

import { Welcome } from "./pages/Welcome";
import { Dooglers } from "./pages/Dooglers";
import { Create } from "./pages/Create";
import { FindMinder } from "./pages/FindMinder";

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const firebaseApp = useFirebaseApp();
  return (
    <FirestoreProvider sdk={getFirestore(firebaseApp)}>
      <AuthProvider sdk={getAuth(firebaseApp)}>
        <StorageProvider sdk={getStorage(firebaseApp)}>
          <AnalyticsProvider sdk={getAnalytics(firebaseApp)}>
            <FunctionsProvider sdk={getFunctions(firebaseApp)}>
              {children}
            </FunctionsProvider>
          </AnalyticsProvider>
        </StorageProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dooglers" element={<Dooglers />} />
        <Route path="/create" element={<Create />} />
        <Route path="/find-minder" element={<FindMinder />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <Router />
    </FirebaseProvider>
  );
}

export default App;

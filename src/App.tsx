/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router />
      </LocalizationProvider>
    </FirebaseProvider>
  );
}

export default App;

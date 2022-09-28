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

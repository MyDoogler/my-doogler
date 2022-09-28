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

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAuth, useSigninCheck } from "reactfire";
import { Spinner } from "./Spinner";
import { DogPic } from "./DogPic";

import dog1 from "../assets/dogpic1.png";
import dog2 from "../assets/dogpic2.png";
import dog3 from "../assets/dogpic3.png";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

function DogPics() {
  return (
    <div className="dogpics">
      <DogPic src={dog1} />
      <DogPic src={dog2} />
      <DogPic src={dog3} />
    </div>
  );
}

export function Login() {
  const auth = useAuth();
  const { status, data: user } = useSigninCheck();
  if (status === "loading") {
    return <Spinner />;
  }
  if (user.signedIn) {
    return <DogPics />;
  }
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}

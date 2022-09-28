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

import { useSigninCheck } from "reactfire";
import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import { CreateDooglerForm } from "../components/CreateDooglerForm";
import { Login } from "../components/Login";
import smartDogs from "../assets/header.jpg";

export const Create = () => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <>
      <Header />
      <ImageWithTextBlock imageSrc={smartDogs} text={"Add a Doogler"} />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : signInCheckResult.signedIn ? (
        <CreateDooglerForm />
      ) : (
        <>
          <div style={{ marginTop: 10 }}>
            You must be signed in to create a doogler
          </div>
          <Login />
        </>
      )}
    </>
  );
};

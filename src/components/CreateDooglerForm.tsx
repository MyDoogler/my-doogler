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

import { useState } from "react";
import { useUser } from "reactfire";
import { ImageUpload } from "../components/ImageUpload";
import { Spinner } from "./Spinner";
import { useFirestore } from "reactfire";
import { setDoc, collection, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export const CreateDooglerForm = () => {
  const firestore = useFirestore();
  const { status, data: user } = useUser();

  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [office, setOffice] = useState<string>("");

  // imgSrc is set by ImageUpload.tsx, after the user uploads an image
  const [imgSrc, setImgSrc] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const gotEverything = !name || !breed || !age || !office || !imgSrc;

  const submit = async () => {
    if (!user) {
      alert("You must be signed in to create a doogler");
      return;
    }
    if (gotEverything) {
      alert("Please fill out all required fields, including the photo");
      return;
    }
    setLoading(true);
    const id = uuid();
    const dog = {
      id,
      breed,
      age,
      description,
      name,
      office,
      imgSrc,
      owner: user.email,
    };
    console.log(dog);
    try {
      // TODO test if it adds the key ID to the dog object and its the same
      await setDoc(doc(collection(firestore, "dogs"), id), dog);
      alert("Doogler created successfully");
      setSuccess(true);
    } catch (error) {
      alert(`Error creating doogler: ${error}`);
    }
    setLoading(false);
  };

  const ThanksForCreating = () => (
    <div>
      <h2>Doogler created successfully</h2>
      <p>Thanks for adding a doogler to the pack!</p>
      <button onClick={() => setSuccess(false)}>Add another doogler</button>
    </div>
  );

  return (
    <div>
      {status === "loading" ? (
        <Spinner />
      ) : success ? (
        <ThanksForCreating />
      ) : (
        <div className="upload-form">
          <div className="upload-form__upload">
            <ImageUpload url={`${user?.uid}/dogs`} setImgSrc={setImgSrc} />
          </div>
          <div className="upload-form__input">
            <div style={{ textAlign: "start" }}>
              <div className="label">
                <b>Name:</b>
              </div>
              <input
                placeholder={"Stitch"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <div className="label">
                <b>Breed:</b>
              </div>
              <input
                placeholder={"Pug"}
                value={breed}
                onChange={(e) => {
                  setBreed(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <div className="label">
                <b>Age:</b>
              </div>
              <input
                placeholder={"3"}
                value={age}
                type={"number"}
                min={0}
                max={20}
                onChange={(e) => {
                  setAge(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <div className="label">
                <b>Office:</b>
              </div>
              {/* TODO could make the below a select */}
              <input
                placeholder={"IE-DUB-VSO"}
                value={office}
                onChange={(e) => {
                  setOffice(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <div className="label">
                <b>Description (optional):</b>
              </div>
              <textarea
                placeholder={"Loves beily rubs"}
                value={description}
                style={{ height: "5rem" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <button
              style={{
                width: 80,
                height: 30,
              }}
              onClick={!loading ? submit : () => {}}
            >
              {!loading ? "Submit" : "Submitting..."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

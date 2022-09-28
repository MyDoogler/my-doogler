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
import { useStorageDownloadURL, useStorage, useUser } from "reactfire";
import { ref } from "firebase/storage";
import { Spinner } from "./Spinner";
import { useFirestore } from "reactfire";
import { setDoc, doc, collection } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { MinderApplicationProps } from "./MinderApplication";

export interface DooglerProps {
  id: string;
  imgSrc: string; // gs://...
  name: string; // "Stitch"
  breed: string; // "Pug"
  age: number; // 3
  owner: string; // email (ldap)
  office: string; // IE-DUB-VSO

  // optional
  description?: string; // "This is a pug"
  lookingForMinder?: boolean; // true
  startTime?: number;
  endTime?: number;
  minderApplications?: Array<MinderApplicationProps>;
}

function unixToDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString();
}

function unixToTime(unix: number) {
  return new Date(unix * 1000).toLocaleTimeString();
}

export const Doogler = (props: DooglerProps) => {
  const storage = useStorage();
  const firestore = useFirestore();
  const { status: userStatus, data: user } = useUser();
  const { status, data: src } = useStorageDownloadURL(
    ref(storage, props.imgSrc)
  );

  const userHasApplied = props.minderApplications?.some(
    (minderApplication) => minderApplication.minderId === user?.uid
  );

  const [message, setMessage] = useState(
    "Hi, I'm interested in minding your dog :)"
  );

  const apply = async () => {
    if (!user?.email) {
      alert("Please login to apply");
      return;
    }
    const existingMinderApplications = [];
    if (props?.minderApplications) {
      existingMinderApplications.push(...props.minderApplications);
    }
    await setDoc(
      doc(collection(firestore, "dogs"), props.id),
      {
        // this potentially might overwrite not sure if merge will extend the array
        minderApplications: [
          ...existingMinderApplications,
          {
            id: uuid(),
            message,
            status: "pending",
            dooglerId: props.id,
            minderId: user.uid,
            minderEmail: user.email,
          },
        ],
      },
      { merge: true }
    );

    alert("Application sent!");
  };

  return (
    <div className="doogler__container">
      <div className="doogler__image">
        {status !== "loading" && (
          <img src={src} alt="dog-pic" style={{ maxWidth: 300 }} />
        )}
      </div>
      <div className="doogler__info">
        <div className="doogler__name">{props.name.slice(0, 13)}</div>
        <div className="doogler__property">
          <b>Breed:</b>
          <br /> {props.breed}
        </div>
        <div className="doogler__property">
          <b>Age:</b> {"🍖".repeat(props.age)}
        </div>
        <div className="doogler__property">
          <b>Owner:</b> <br />
          {props.owner}
        </div>
        <div className="doogler__property">
          <b>Office:</b> <br />
          {props.office}
        </div>
        <div className="doogler__property doogler__description">
          <b>Description:</b>
          <br />
          <span className="doogler__description-box">
            {props?.description || "-"}
          </span>
        </div>
        <div>
          {props?.lookingForMinder && props.startTime && props.endTime && user && (
            <>
              <div>
                <b>Looking for minder:</b>
              </div>
              <div className="doogler__property">
                <b>Start:</b> {unixToDate(props.startTime)}{" "}
                {unixToTime(props.startTime)}
              </div>
              <div className="doogler__property">
                <b>End:</b> {unixToDate(props.endTime)}{" "}
                {unixToTime(props.endTime)}
              </div>
              {userStatus === "loading" ? (
                <Spinner />
              ) : (
                user.email !== props.owner &&
                (!userHasApplied ? (
                  <div className="doogler__property">
                    <b>Message:</b>
                    <br />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={() => apply()}>Apply</button>
                  </div>
                ) : (
                  <div className="doogler__property">
                    <b>✅ Applied to this one</b>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

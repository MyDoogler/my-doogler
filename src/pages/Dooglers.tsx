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

import { Link } from "react-router-dom";
import { Doogler } from "../components/Doogler";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { query, collection } from "firebase/firestore";
import { Spinner } from "../components/Spinner";
import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import dogAndOwner from "../assets/header.jpg";

export const Dooglers = () => {
  const firestore = useFirestore();
  const dooglersQuery = query(collection(firestore, "dogs"));
  const { status, data: dooglers } = useFirestoreCollectionData(dooglersQuery);
  return (
    <>
      <Header />
      <ImageWithTextBlock text="See Dooglers" imageSrc={dogAndOwner} />
      {status === "loading" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "70vh",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : dooglers?.length && dooglers.length ? (
        <div className="dooglers__container">
          {dooglers.map((doogler, index) => (
            <Doogler
              key={index}
              id={doogler.id}
              imgSrc={doogler.imgSrc}
              name={doogler.name}
              breed={doogler.breed}
              owner={doogler.owner}
              office={doogler.office}
              description={doogler?.description}
              age={doogler.age}
              lookingForMinder={doogler?.lookingForMinder}
              minderApplications={doogler?.minderApplications}
              startTime={doogler?.startTime}
              endTime={doogler?.endTime}
            />
          ))}
        </div>
      ) : (
        <>
          <p>
            No dooglers yet, <Link to="/create">create</Link>
          </p>
        </>
      )}
    </>
  );
};

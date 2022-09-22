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
        <div style={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center', flexDirection: 'column' }}>
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : dooglers?.length && dooglers.length ? (
        <div className="dooglers__container">
          {
            dooglers.map((doogler, index) => (
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
            ))
          }
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

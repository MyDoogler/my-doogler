import { Link } from "react-router-dom";
import { Doogler } from "../components/Doogler";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { query, collection } from "firebase/firestore";
import { Spinner } from "../components/Spinner";
import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import dogAndOwner from "../assets/dog-and-owner.png";

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
        dooglers.map((doogler, index) => (
          <Doogler
            key={index}
            imgSrc={doogler.imgSrc}
            name={doogler.name}
            breed={doogler.breed}
            owner={doogler.owner}
            office={doogler.office}
            description={doogler?.description}
            age={doogler.age}
          />
        ))
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

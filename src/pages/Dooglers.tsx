import { Link } from 'react-router-dom';
import { UploadForm } from '../components/ImageUpload';
import { Doogler } from '../components/Doogler';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { query, collection } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';

export const Dooglers = () => {
  const firestore = useFirestore();
  const dooglersQuery = query(collection(firestore, 'dogs'));
  const { status, data: dooglers } = useFirestoreCollectionData(dooglersQuery);
  return (
    <>
      <Link to="/">Go back</Link>
      {status === 'loading' ? (
        <Spinner />
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
          <p>No dooglers yet, create below</p>
          <UploadForm />
        </>
      )}
    </>
  );
};

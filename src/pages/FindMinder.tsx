import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { query, collection, where, setDoc, DocumentData, doc } from "firebase/firestore";
import { Doogler } from "../components/Doogler";

export const FindMinder = () => {
  const firestore = useFirestore();
  const { status: userStatus, data: user } = useUser();
  const dooglersQuery = query(collection(firestore, "dogs"), where("owner", "==", user?.email || ""));
  const { status, data: dooglers } = useFirestoreCollectionData(dooglersQuery);

  const findMinder = async (doogler: DocumentData) => {
    // TODO
    // await setDoc(doc(collection(firestore, "dogs"), doogler.id), {
    //   ...doogler,
    // })
  }
  return (
    <>
      <Header />
      <ImageWithTextBlock
        imageSrc={
          "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&q=80&cs=tinysrgb&fm=jpg&crop=entropy&w=2000"
        }
        text={"Find Minder"}
      />
      {status === "loading" || userStatus === "loading" ? <p>Loading...</p> : (
        dooglers.length === 0 ? <p>You have no dooglers</p> : (
          dooglers?.map((doogler, index) => (
            <>
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
              <button onClick={() => findMinder(doogler)}>Find Minder for {doogler.name}</button>
            </>
          ))
        )
      )}
    </>
  )
}


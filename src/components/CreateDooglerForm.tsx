import { useState } from "react";
import { useUser } from "reactfire";
import { ImageUpload } from "../components/ImageUpload";
import { Spinner } from "./Spinner";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";

export const CreateDooglerForm = () => {
  const firestore = useFirestore();
  const { status, data: user } = useUser();

  const [name, setName] = useState<string>();
  const [breed, setBreed] = useState<string>();
  const [age, setAge] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [office, setOffice] = useState<string>();

  // imgSrc is set by ImageUpload.tsx, after the user uploads an image
  const [imgSrc, setImgSrc] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const submit = async () => {
    if (!user) {
      alert("You must be signed in to create a doogler");
      return;
    }
    if (!name || !breed || !age || !office) {
      alert("Please fill out all required fields");
      return;
    }
    if (!imgSrc) {
      alert("Please upload a photo");
      return;
    }
    setLoading(true);
    const dog = {
      breed,
      age,
      description,
      name,
      office,
      imgSrc,
      owner: user.email,
    };
    console.log(dog)
    try {
      await addDoc(collection(firestore, 'dogs'), dog)
      alert("Doogler created successfully");
      setSuccess(true);
    } catch (error) {
      alert(`Error creating doogler: ${error}`);
    }
    setLoading(false);
  }

  const ThanksForCreating = () => (
    <div>
      <h2>Doogler created successfully</h2>
      <p>Thanks for adding a doogler to the pack!</p>
      <button onClick={() => setSuccess(false)}>Add another doogler</button>
    </div>
  )

  return (
    <div>
      {status === "loading" ? <Spinner /> : (
        success ? <ThanksForCreating /> : (
          <>
            <ImageUpload url={`${user?.uid}/dogs`} setImgSrc={setImgSrc} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Name:</b>
                </div>
                <input
                  placeholder={"Stitch"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Breed:</b>
                </div>
                <input
                  placeholder={"Pug"}
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Age:</b>
                </div>
                <input
                  placeholder={"3"}
                  value={age}
                  type={"number"}
                  min={0}
                  max={20}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Office:</b>
                </div>
                <input
                  placeholder={"IE-DUB-VSO"}
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Owner:</b>
                </div>
                <div>{user?.email || "❌ user not logged in!"}</div>
              </div>
              <div style={{ textAlign: "start" }}>
                <div>
                  <b>Description (optional):</b>
                </div>
                <input
                  placeholder={"Loves belly rubs"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {!loading ? <div onClick={submit}>Submit</div> : <div>Submitting...</div>}
          </>
        )
      )}
    </div>
  )
}

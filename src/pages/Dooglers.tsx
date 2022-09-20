import { Link } from "react-router-dom";
import { useStorage, useStorageDownloadURL } from "reactfire";
import { ref } from "firebase/storage";
import { UploadForm } from "../components/ImageUpload";

export interface Doogler {
  name: string;
  [asdf: string]: any; // TODO(piotrostr) add rest
}

export const Doogler = () => {
  const storage = useStorage();
  const dooglerRef = ref(
    storage,
    'craiyon_153130_google_dog.png',
  );
  const { status, data: imageURL } = useStorageDownloadURL(dooglerRef);

  if (status === 'loading') {
    return (
      <>
        <p style={{ fontSize: '8rem' }}>🐕</p>
        <span>loading... ({dooglerRef.toString()})</span>
      </>
    );
  }

  return (
    <img src={imageURL} alt="dogs-stitch" style={{ maxWidth: 250 }} />
  );
}

export const Dooglers = () => {
  return (
    <>
      <Link to="/">Go back</Link>
      <UploadForm />
      <pre>
        <Doogler />
      </pre>
    </>
  )
}

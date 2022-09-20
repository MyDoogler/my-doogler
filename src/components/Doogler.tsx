import { useStorageDownloadURL, useStorage } from "reactfire"
import { ref } from "firebase/storage"

export interface DooglerProps {
  imgSrc: string;  // gs://...
  name: string;   // "Stitch"
  breed: string;  // "Pug"
  age: number;  // 3
  owner: string;  // email (ldap)
  description?: string; // "This is a pug"
  office: string;  // IE-DUB-VSO
}

export const Doogler = (props: DooglerProps) => {
  const storage = useStorage();
  const { status, data: src } = useStorageDownloadURL(ref(storage, props.imgSrc));
  return (
    <div>
      <p style={{ fontSize: '3rem' }}>{props.name}</p>
      {
        status === 'loading'
          ? <p>Loading...</p>
          : <img src={src} alt="dogs-stitch" style={{ maxWidth: 250 }} />
      }
      <p>{props.breed}</p>
      <p>{props.age}</p>
      <p>{props.owner}</p>
      <p>{props.description}</p>
      <p>{props.office}</p>
    </div>
  );
}

// import { useState } from 'react';
import { Link } from "react-router-dom";
import { useStorage, useStorageDownloadURL, /* useStorageTask */ } from "reactfire";
import { ref, /* UploadTaskSnapshot */ } from "firebase/storage";

export interface Doogler {
  name: string;
  [key: string]: any; // TODO add rest
}

// TODO add upload
// export const UploadProgress = ({ uploadTask, storageRef }: any) => {
//   const { status, data: uploadProgress } = useStorageTask<UploadTaskSnapshot>(uploadTask, storageRef);
// 
//   let percentComplete;
// 
//   if (status === 'loading') {
//     percentComplete = '0%';
//   } else {
//     const { bytesTransferred, totalBytes } = uploadProgress;
//     percentComplete = Math.round(100 * (bytesTransferred / totalBytes)) + '%';
//   }
// 
//   return <span>{percentComplete} uploaded</span>;
// }
// 
// export const UploadForm = () => {
//   const storage = useStorage()
//   const storageRef = ref(storage, 'dooglers');
//   const [uploadTask, setUploadTask] = useState(null);
// }

export const Doogler = () => {
  const storage = useStorage();
  const dooglerRef = ref(storage, 'dogs/stitch.jpg');

  const { status, data: imageURL } = useStorageDownloadURL(dooglerRef);

  if (status === 'loading') {
    return (
      <>
        <p style={{ fontSize: '8rem' }}>🐕</p>
        <span>loading... ({dooglerRef.toString()})</span>
      </>
    );
  }

  return <img src={imageURL} alt="dogs-stitch" />;
}

export const Dooglers = () => {
  return (
    <>
      <Link to="/">Go back</Link>
      <Doogler />
    </>
  )
}

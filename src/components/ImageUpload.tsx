import { useCallback, useState } from "react"
import { useStorage, useStorageTask } from "reactfire"
import { ref, uploadBytesResumable, UploadTaskSnapshot, StorageReference } from "firebase/storage"
import Dropzone from "react-dropzone";

export interface UploadProgressProps {
  uploadTask: UploadTaskSnapshot | undefined;
  storageRef: StorageReference;
}

// TODO limit the amount of files that can be uploaded to <5 
export const UploadProgress = ({ uploadTask, storageRef }: UploadProgressProps) => {
  if (!uploadTask) {
    return <></>;
  }
  const { status, data: uploadProgress } = useStorageTask<UploadTaskSnapshot>(
    uploadTask as any,
    storageRef
  );

  if (status === 'loading') {
    return <span>0% uploaded</span>;
  } else {
    switch (uploadProgress.state) {
      case 'running': {
        const { bytesTransferred, totalBytes } = uploadProgress;
        return (
          <span>
            {Math.round(100 * (bytesTransferred / totalBytes))}% uploaded
          </span>
        );
      }
      case 'paused': {
        return <span>Upload paused</span>;
      }
      case 'success': {
        return <></>
      }
      case 'error': {
        return <span>Upload error</span>;
      }
      case 'canceled': {
        return <span>Upload canceled</span>;
      }
    }
  }
}

export const UploadForm = () => {
  // TODO(piotrostr)
  // take the current user and build the storage ref
  // apply CUD rules to the storage ref for the user, R for everyone else
  const storage = useStorage()
  const storageRef = ref(storage, 'some-user/dooglers');
  const [uploadTask, setUploadTask] = useState<UploadTaskSnapshot>();
  const onDrop = useCallback((files: Array<File>) => {
    for (const file of files) {
      const fileRef = ref(storageRef, file.name);
      const _uploadTask = uploadBytesResumable(fileRef, file)
      setUploadTask(_uploadTask as any);
    }
  }, [])
  return (
    <>
      <UploadProgress uploadTask={uploadTask} storageRef={storageRef} />
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section style={{
            width: 250,
            height: 250,
            border: '1px solid black'
          }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  )
}

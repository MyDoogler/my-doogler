import { useCallback, useState } from 'react';
import { useStorage, useStorageTask } from 'reactfire';
import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageReference,
  UploadTask,
} from 'firebase/storage';
import Dropzone from 'react-dropzone';

export interface UploadProgressProps {
  uploadTask: UploadTask | undefined;
  storageRef: StorageReference;
}

export const UploadProgress = ({
  uploadTask,
  storageRef,
}: UploadProgressProps) => {
  if (!uploadTask) {
    return <></>;
  }
  const { status, data: uploadProgress } = useStorageTask<UploadTaskSnapshot>(
    uploadTask as any,
    storageRef,
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
        return <>🎉</>;
      }
      case 'error': {
        return <span>Upload error</span>;
      }
      case 'canceled': {
        return <span>Upload canceled</span>;
      }
    }
  }
};

export interface PendingUpload {
  uploadTask: UploadTask;
  storageRef: StorageReference;
}

export const ImageUpload = () => {
  // TODO(piotrostr)
  // take the current user and build the storage ref
  // apply CUD rules to the storage ref for the user, R for everyone else
  const storage = useStorage();
  const storageRef = ref(storage, 'some-user/dooglers'); // TODO this has to be dynamic
  const [pendingUploads, setPendingsUploads] = useState<Array<PendingUpload>>(
    [],
  );

  const onDrop = useCallback((files: Array<File>) => {
    const _pendingUploads = Array<PendingUpload>();
    for (const file of files.slice(0, 5)) {
      const fileRef = ref(storageRef, file.name);
      const _uploadTask = uploadBytesResumable(fileRef, file);
      _pendingUploads.push({
        uploadTask: _uploadTask,
        storageRef: fileRef,
      });
    }
    setPendingsUploads(_pendingUploads);
  }, []);

  return (
    <>
      {pendingUploads.map(({ uploadTask, storageRef }, index) => (
        <div key={index}>
          <UploadProgress uploadTask={uploadTask} storageRef={storageRef} />
        </div>
      ))}
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section
            style={{
              width: 250,
              height: 250,
              border: '1px solid black',
            }}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <p>Max 5 at a time!</p>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

import { useCallback, useEffect, useState, useMemo } from "react";
import {
  useStorage,
  useStorageDownloadURL,
  useStorageTask,
  useUser,
} from "reactfire";
import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageReference,
  UploadTask,
  getDownloadURL,
} from "firebase/storage";
import Dropzone, { useDropzone } from "react-dropzone";

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
    storageRef
  );

  if (status === "loading") {
    return <span>0% uploaded</span>;
  } else {
    switch (uploadProgress.state) {
      case "running": {
        const { bytesTransferred, totalBytes } = uploadProgress;
        return (
          <span>
            {Math.round(100 * (bytesTransferred / totalBytes))}% uploaded
          </span>
        );
      }
      case "paused": {
        return <span>Upload paused</span>;
      }
      case "success": {
        return <></>;
      }
      case "error": {
        return <span>Upload error</span>;
      }
      case "canceled": {
        return <span>Upload canceled</span>;
      }
    }
  }
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
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
  const [snapshotRef, setSnapshotRef] = useState<StorageReference>();
  const storageRef = ref(storage, "some-user/dooglers"); // TODO this has to be dynamic
  const [pendingUploads, setPendingsUploads] = useState<Array<PendingUpload>>(
    []
  );
  const [downloadUrl, setDownloadUrl] = useState<string>();

  const onDrop = useCallback((files: Array<File>) => {
    const _pendingUploads = Array<PendingUpload>();
    // change slice size to support multiple uploads
    for (const file of files.slice(0, 1)) {
      if (
        !file.name.endsWith(".jpg") &&
        !file.name.endsWith(".png") &&
        !file.name.endsWith(".jpeg")
      ) {
        alert("Only .jpg, .jpeg, and .png files are supported");
        return;
      }
      const fileRef = ref(storageRef, file.name);
      const _uploadTask = uploadBytesResumable(fileRef, file);
      _pendingUploads.push({
        uploadTask: _uploadTask,
        storageRef: fileRef,
      });
      setSnapshotRef(_uploadTask.snapshot.ref);
    }
    setPendingsUploads(_pendingUploads);
  }, []);

  useEffect(() => {
    if (snapshotRef) {
      getDownloadURL(snapshotRef).then((url) => {
        setDownloadUrl(url);
      });
    }
  }, [snapshotRef]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  ) as React.CSSProperties;

  const clear = () => {
    setDownloadUrl(undefined);
    setSnapshotRef(undefined);
    setPendingsUploads([]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 350,
      }}
    >
      {pendingUploads.map(({ uploadTask, storageRef }, index) => (
        <div key={index}>
          <UploadProgress uploadTask={uploadTask} storageRef={storageRef} />
        </div>
      ))}
      {downloadUrl ? (
        <img src={downloadUrl} width={100} />
      ) : (
        <div className="dropzone container" style={{ cursor: "pointer" }}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a doggo</p>
          </div>
        </div>
      )}
      {downloadUrl && (
        <button onClick={clear} style={{ width: 80 }}>
          Clear
        </button>
      )}
    </div>
  );
};

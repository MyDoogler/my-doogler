import { useStorageDownloadURL, useStorage } from "reactfire";
import { ref } from "firebase/storage";

export interface DooglerProps {
  imgSrc: string; // gs://...
  name: string; // "Stitch"
  breed: string; // "Pug"
  age: number; // 3
  owner: string; // email (ldap)
  description?: string; // "This is a pug"
  office: string; // IE-DUB-VSO
}

export const Doogler = (props: DooglerProps) => {
  const storage = useStorage();
  const { status, data: src } = useStorageDownloadURL(
    ref(storage, props.imgSrc)
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "3rem",
        alignItems: "flex-start",
        maxWidth: "800px",
      }}
    >
      <div>
        {status !== "loading" && (
          <img
            src={src}
            alt="dogs-stitch"
            style={{ maxWidth: 350, marginRight: 30, maxHeight: 350 }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1rem",
            marginTop: "0.5rem",
          }}
        >
          {props.name}
        </div>
        <div style={{ marginTop: "5px" }}>
          <b>Breed:</b> {props.breed}
        </div>
        <div style={{ marginTop: "5px" }}>
          <b>Age:</b> {props.age}
        </div>
        <div style={{ marginTop: "5px" }}>
          <b>Owner:</b> {props.owner}
        </div>
        <div style={{ marginTop: "5px" }}>
          <b>Office:</b> {props.office}
        </div>
        <div style={{ marginTop: "5px" }}>
          <b>Description:</b>
          <br /> {props.description || "-"}
        </div>
      </div>
    </div>
  );
};

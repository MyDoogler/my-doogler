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
    <div className="doogler__container">
      <div className="doogler__image">
        {status !== "loading" && (
          <img
            src={src}
            alt="dog-pic"
            style={{ maxWidth: 300 }}
          />
        )}
      </div>
      <div className="doogler__info">
        <div className="doogler__name">
          {props.name}
        </div>
        <div className="doogler__property">
          <b>Breed:</b> {props.breed}
        </div>
        <div className="doogler__property">
          <b>Age:</b> {props.age}
        </div>
        <div className="doogler__property">
          <b>Owner:</b> {props.owner}
        </div>
        <div className="doogler__property">
          <b>Office:</b> {props.office}
        </div>
        <div className="doogler__property doogler__description">
          <b>Description:</b>
          <br /> {props.description || "-"}
        </div>
      </div>
    </div>
  );
};

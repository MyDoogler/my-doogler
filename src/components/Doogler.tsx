export interface DooglerProps {
  imgSrc: string;  // https://firestore.googleapis.com/...
  name: string;   // "Stitch"
  breed: string;  // "Pug"
  age: number;  // 3
  owner: string;  // email (ldap)
  description?: string; // "This is a pug"
  office: string;  // IE-DUB-VSO
}

export const Doogler = (props: DooglerProps) => {
  return (
    <div>
      <p style={{ fontSize: '3rem' }}>{props.name}</p>
      <img src={props.imgSrc} alt="dogs-stitch" style={{ maxWidth: 250 }} />
      <p>{props.breed}</p>
      <p>{props.age}</p>
      <p>{props.owner}</p>
      <p>{props.description}</p>
      <p>{props.office}</p>
    </div>
  );
}

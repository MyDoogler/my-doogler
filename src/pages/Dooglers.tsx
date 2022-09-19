import { Link } from "react-router-dom";

export interface Doogler {
  name: string;
  [key: string]: any; // TODO add rest
}

export const Dooglers = () => {
  return (
    <>
      <Link to="/">Go back</Link>
      <p style={{ fontSize: '8rem' }}>🐕</p>
    </>
  )
}

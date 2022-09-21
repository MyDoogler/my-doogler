import { Link } from "react-router-dom";
import paw from "../assets/paw.svg";

export const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ flex: "1", display: "flex", justifyContent: "flex-start" }}>
        <img src={paw} alt="paw-logo" width={30} height={30} />
      </div>
      <div
        style={{
          flex: "2.8",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/dooglers">Dooglers</Link>
        <Link to="/create">Create</Link>
      </div>
      <div style={{ flex: "1" }} />
    </header>
  );
};

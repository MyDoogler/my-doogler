import { Link } from "react-router-dom";
import { useSigninCheck, useUser } from "reactfire";
import paw from "../assets/paw.svg";

export const Header = () => {
  const { status, data: signInCheckResult } = useSigninCheck()
  const { status: userStatus, data: user } = useUser()
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
          flex: "2",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/dooglers">Dooglers</Link>
        <Link to="/create">Create</Link>
      </div>
      <div style={{ flex: "1", display: 'flex', justifyContent: 'center' }}>
        {
          status === 'success' && signInCheckResult.signedIn ? (
            userStatus === 'success' && user && (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src={user.photoURL || ""} alt="user-profile" width={30} height={30} style={{ borderRadius: 999, marginRight: 10 }} />
                <div>{user.email?.split('@')[0]}</div>
              </div>
            )
          ) : (
            <Link to="/">Sign In</Link>
          )
        }
      </div>
    </header>
  );
};

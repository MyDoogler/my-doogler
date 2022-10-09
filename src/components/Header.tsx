/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import paw from "../assets/paw.svg";
import hamburger from "../assets/hamburger.svg";
import logout from "../assets/logout.svg";
import { signOut } from "firebase/auth";

export const Header = () => {
  const auth = useAuth();
  const { status, data: signInCheckResult } = useSigninCheck();
  const { status: userStatus, data: user } = useUser();
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  const LinksMenu = () => (
    <>
      <div className="links-menu">
        <Link to="/">Home</Link>
        <Link to="/dooglers">Dooglers</Link>
        <Link to="/create">Create</Link>
        <Link to="/find-minder">Find Minder</Link>
      </div>
    </>
  );

  const SignInMenu = () => (
    <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
      {status === "success" && signInCheckResult.signedIn ? (
        userStatus === "success" &&
        user && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={user?.photoURL || ""}
                alt="user-profile-pic"
                width={30}
                height={30}
                style={{ borderRadius: 999, marginRight: 10 }}
              />
              {width > 600 && <div>{user?.displayName}</div>}
              <div
                style={{ marginLeft: 10, marginTop: 5, cursor: "pointer" }}
                onClick={() => signOut(auth)}
              >
                <img src={logout} width={15} height={15} alt="logout-icon" />
              </div>
            </div>
          </>
        )
      ) : (
        <Link to="/">Sign In</Link>
      )}
    </div>
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const HamburgerMenu = ({ isOpen, setIsOpen }: any) => (
    <div style={{ flex: "1", display: "flex", justifyContent: "end" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ marginTop: 5, cursor: "pointer" }}
      >
        <img src={hamburger} width={25} height={25} alt="hamburger-icon" />
      </div>
      {isOpen ? (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            boxShadow: "0 0 1px 0 rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LinksMenu />
          <SignInMenu />
        </div>
      ) : null}
    </div>
  );

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
      {width > 800 ? (
        <>
          <LinksMenu /> <SignInMenu />
        </>
      ) : (
        <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};

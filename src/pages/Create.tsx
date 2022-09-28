import { useSigninCheck } from "reactfire";
import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import { CreateDooglerForm } from "../components/CreateDooglerForm";
import { Login } from "../components/Login";
import smartDogs from "../assets/header.jpg";

export const Create = () => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <>
      <Header />
      <ImageWithTextBlock
        imageSrc={smartDogs}
        text={"Add a Doogler"}
      />
      {
        status === "loading" ? (
          <div>Loading...</div>
        ) : signInCheckResult.signedIn ? (
          <CreateDooglerForm />
        ) : (
          <>
            <div style={{ marginTop: 10 }}>You must be signed in to create a doogler</div>
            <Login />
          </>
        )
      }
    </>
  );
};

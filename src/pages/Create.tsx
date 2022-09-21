import { useSigninCheck, useUser } from "reactfire";
import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import { CreateDooglerForm } from "../components/CreateDooglerForm";
import { Login } from "../components/Login";

export const Create = () => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <>
      <Header />
      <ImageWithTextBlock
        imageSrc={
          "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&q=80&cs=tinysrgb&fm=jpg&crop=entropy&w=2000"
        }
        text={"Add a Doogler"}
      />
      {
        status === "loading" ? (
          <div>Loading...</div>
        ) : signInCheckResult.signedIn ? (
          <CreateDooglerForm />
        ) : (
          <>
            <div>You must be signed in to create a doogler</div>
            <Login />
          </>
        )
      }
    </>
  );
};

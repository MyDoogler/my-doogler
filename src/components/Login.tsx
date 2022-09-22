import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAuth, useSigninCheck } from "reactfire";
import { Spinner } from "./Spinner";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export function Login() {
  const auth = useAuth();
  const { status, data: user } = useSigninCheck();
  if (status === "loading") {
    return <Spinner />
  }
  if (user.signedIn) {
    return
  }
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}

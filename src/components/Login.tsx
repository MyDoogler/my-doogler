import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "reactfire";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export function Login() {
  const auth = useAuth();
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}
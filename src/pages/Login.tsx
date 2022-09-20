//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
//import firebase from "firebase/compat/app"
//import "firebase/compat/auth"
//import { useAuth } from "reactfire"

import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth, useUser } from 'reactfire';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export function Login() {
  const auth = useAuth();
  return (
    <div>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

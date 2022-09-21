import dog from '../assets/dog.svg';
import { useFirebaseApp } from 'reactfire';
import { Header } from "../components/Header"

export const Welcome = () => {
  const firebaseApp = useFirebaseApp();
  return (
    <>
      <Header />
      <br />
      <img src={dog} width={100} />
      <p style={{ fontSize: '3rem', marginTop: '2rem' }}>MyDoogler</p>
      Firebase Project ID:
      <pre>
        <code>{firebaseApp.options.projectId || ''}</code>
      </pre>
    </>
  );
};

import { Header } from "../components/Header";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";
import smartDogs from "../assets/header.jpg";
import { Login } from "../components/Login";

export const Welcome = () => {
  const text = "Join the Doogler community!";
  return (
    <>
      <Header />
      <ImageWithTextBlock imageSrc={smartDogs} text={text} />
      <h1 style={{ fontSize: "2rem", marginTop: "2rem" }}>About</h1>
      <p
        style={{
          padding: 10,
          maxWidth: 500,
          margin: "auto",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        Welcome to the Doogler platform! We help connecting Dooglers with
        Googlers in our Google offices, making the life easier to the Googlers
        with dogs and more exciting office visits to our Googlers who love dogs!
        To join the program, all you need to do is to click join and try it out
        yourself!
        <i>
          <p>
            Note: the site is in alpha phase, some things might not work. If you
            have any questions or remarks, please contact us at{" "}
            <a href="mailto:mydoogler@google.com">mydoogler@google.com</a>
            <p>Be sure not to upload any personal/sensitive data!</p>
          </p>
        </i>
      </p>
      <Login />
    </>
  );
};

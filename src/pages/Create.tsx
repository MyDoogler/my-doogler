import { useState } from "react";
import { useUser } from "reactfire";
import { Header } from "../components/Header";
import { ImageUpload } from "../components/ImageUpload";
import { ImageWithTextBlock } from "../components/ImageWithTextBlock";

export const Create = () => {
  const [name, setName] = useState<string>();
  const [breed, setBreed] = useState<string>();
  const [age, setAge] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [office, setOffice] = useState<string>();
  const user = useUser();
  return (
    <>
      <Header />
      <ImageWithTextBlock
        imageSrc={
          "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&q=80&cs=tinysrgb&fm=jpg&crop=entropy&w=2000"
        }
        text={"Add a Doogler"}
      />
      <div>
        <ImageUpload />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Name:</b>
            </div>
            <input
              placeholder={"Stitch"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Breed:</b>
            </div>
            <input
              placeholder={"Pug"}
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Age:</b>
            </div>
            <input
              placeholder={"3"}
              value={age}
              type={"number"}
              min={0}
              max={20}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Office:</b>
            </div>
            <input
              placeholder={"IE-DUB-VSO"}
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Owner:</b>
            </div>
            <div>{user?.data?.email || "❌ user not logged in!"}</div>
          </div>
          <div style={{ textAlign: "start" }}>
            <div>
              <b>Description (optional):</b>
            </div>
            <input
              placeholder={"Loves belly rubs"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

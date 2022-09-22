interface Props {
  imageSrc: string;
  text: string;
}

export const ImageWithTextBlock = ({ imageSrc, text }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        maxHeight: "30vh",
      }}
    >
      <img src={imageSrc} style={{ maxWidth: "100vw" }} />
      <p
        style={{
          position: "absolute",
          margin: "auto",
          fontSize: "3rem",
          color: "white",
          fontWeight: 700,
          lineHeight: "3.3rem",
        }}
      >
        {text}
      </p>
    </div>
  );
};

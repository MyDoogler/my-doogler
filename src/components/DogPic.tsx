interface Props {
  src: string;
}
export const DogPic = ({ src }: Props) => {
  return <img src={src} alt="dog-pic" width={300} />;
};

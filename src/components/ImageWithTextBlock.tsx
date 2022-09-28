/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

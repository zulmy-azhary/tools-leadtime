import React from "react";
import { ImageBanner } from "../atoms";

interface Props {
  src: string;
}

const ImageWrapper: React.FC<Props> = props => {
  const { src } = props;
  return (
    <div className="col-span-3 order-first lg:order-last">
      <ImageBanner src={src} />
    </div>
  );
};

export default ImageWrapper;

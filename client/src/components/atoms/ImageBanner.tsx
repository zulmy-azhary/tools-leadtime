import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageBanner: React.FC<Props> = props => {
  const { src, ...rest } = props;
  return (
    <img
      src={src}
      alt={"Image Banner"}
      className="md:max-w-2xl lg:max-w-xl xl:max-w-3xl 2xl:max-w-4xl select-none"
      {...rest}
    />
  );
};

export default ImageBanner;

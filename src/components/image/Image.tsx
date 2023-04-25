import Image, { ImageProps, StaticImageData } from "next/image";
import React from "react";
import backgroundImage from "../../../public/images/subtract.png";
interface IProps extends ImageProps {}

export const ApImage: React.FC<IProps> = (props: IProps) => {
  return (
    <Image
      style={{
        backgroundImage: "url(public/images/subtract.png)",
      }}
      // alt={'healthshop'}
      width={200}
      height={200}
      {...props}
    />
  );
};

interface IImageProps {
  children?: React.ReactNode;
  className?: string;
  src: string | StaticImageData;
  style?: any;
}
export const ApBackgroundImage: React.FC<IImageProps> = ({
  children,
  className,
  src,
  style,
}) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: " cover",
          width: "50%",
          height: "40.8rem",
          margin: "0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
        // style={style}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

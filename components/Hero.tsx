import React from "react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative md:h-[200px] h-[150px] w-full">
      <Image
        src="/images/codherodark.jpg"
        alt="Hero Image"
        style={{ objectFit: "cover", objectPosition: "50%, 48%" }}
        fill
        priority
      />
      {/* Content for the hero section */}
      {/* <div className="absolute top-0 left-0 w-full h-full"></div> */}
    </div>
  );
};

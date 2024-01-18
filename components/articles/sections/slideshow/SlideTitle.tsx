import React from "react";

export const SlideTitle: React.FC<{ title: string }> = ({ title }) => {
  const limitTitleLength =
    title.length > 50 ? title.substring(0, 84) + "..." : title;
  return (
    <h6 className="text-md text-center font-bold drop-shadow-md md:text-3xl">
      {limitTitleLength}
    </h6>
  );
};

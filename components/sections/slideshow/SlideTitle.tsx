import { shortenTitle } from "@/lib/title-shortener";
import React from "react";

export const SlideTitle: React.FC<{ title: string }> = ({ title }) => {
  const articleTitle = shortenTitle(title, 120);
  return (
    <h6 className="text-md text-center font-bold drop-shadow-xl md:text-xl lg:text-3xl">
      {articleTitle}
    </h6>
  );
};

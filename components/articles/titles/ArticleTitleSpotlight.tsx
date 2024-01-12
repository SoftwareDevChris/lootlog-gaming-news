export const ArticleTitleSpotlight: React.FC<{ title?: string }> = ({
  title,
}) => {
  const placeholder =
    "Simaluted long article title that is very long and has a lot of text and may even becomer longer";

  return (
    <h6 className="lg:text-md bg-custom-amber-800 p-1 text-sm font-bold text-white sm:text-lg">
      {title ?? placeholder}
    </h6>
  );
};

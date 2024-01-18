export const TitleSpotlight: React.FC<{ title: string }> = ({ title }) => {
  const limitTitleLength =
    title.length > 50 ? title.substring(0, 84) + "..." : title;
  return (
    <h6 className="lg:text-md bg-custom-amber-800 p-1 text-sm font-bold text-white sm:text-lg">
      {limitTitleLength}
    </h6>
  );
};

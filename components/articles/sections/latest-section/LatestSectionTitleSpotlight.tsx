export const LatestSectionTitleSpotlight: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <h6 className="lg:text-md border-t border-neutral-100 px-2 py-1 text-xs text-white sm:text-sm lg:text-lg lg:font-bold">
      {title}
    </h6>
  );
};

export const PageTitle: React.FC<{ title: string; paragraph: string }> = ({
  title,
  paragraph,
}) => {
  return (
    <div className="mx-auto max-w-1300 items-center justify-center rounded-xl bg-neutral-700 p-8">
      <h2 className="pb-2 text-center text-2xl font-bold uppercase text-neutral-200">
        {title}
      </h2>
      <p className="mx-auto max-w-[500px] text-center text-sm text-neutral-200">
        {paragraph}
      </p>
    </div>
  );
};

import Link from "next/link";

export const ArticleSectionTitleDefault: React.FC<{
  title: string;
  route?: string;
}> = ({ title, route }) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        <h3 className="m-0 text-2xl font-bold capitalize text-white">
          {title}
        </h3>
        <div className="h-0.5 w-full bg-custom-amber-800" />
      </div>
      {route && (
        <Link
          href={route}
          className="max-w-40 cursor-pointer rounded-xl bg-neutral-800 px-4 py-2 text-sm font-light text-white"
        >
          See all
        </Link>
      )}
    </div>
  );
};

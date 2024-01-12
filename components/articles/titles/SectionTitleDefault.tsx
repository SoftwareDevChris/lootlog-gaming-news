import Link from "next/link";

export const SectionTitleDefault: React.FC<{
  title?: string;
  link: string;
}> = ({ title, link }) => {
  return (
    <div className="flex items-end justify-between py-2">
      <div>
        <h3 className="m-0 text-2xl font-bold uppercase">{title}</h3>
        <div className="h-0.5 w-full bg-custom-amber-800"></div>
      </div>
      <Link
        href={link}
        className="max-w-40 cursor-pointer text-sm hover:underline"
      >
        See all
      </Link>
    </div>
  );
};

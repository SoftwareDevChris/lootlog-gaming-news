import { TDashboardViews } from "@/types/types";

type Props = {
  activeView: TDashboardViews;
  setActiveView: (view: TDashboardViews) => void;
  title: TDashboardViews;
  icon: React.ReactNode;
};

export const DashboardNavigationItem: React.FC<Props> = ({
  activeView,
  setActiveView,
  title,
  icon,
}) => {
  const isActive = activeView === title ? "text-blue-500" : "text-neutral-500";

  return (
    <li
      className={`hover:text-primary-500 flex cursor-pointer items-center rounded-md transition-all duration-200 ease-in-out hover:underline ${isActive}`}
      onClick={() => setActiveView(title)}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </li>
  );
};

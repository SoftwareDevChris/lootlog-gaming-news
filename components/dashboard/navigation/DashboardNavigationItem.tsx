// Types
import { TDashboardViews } from "@/types/types";

// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  isMenuOpen: boolean;
  title: TDashboardViews;
  icon: React.ReactNode;
  setActiveView: React.Dispatch<React.SetStateAction<TDashboardViews>>;
};

export const DashboardNavigationItem: React.FC<Props> = ({
  title,
  icon,
  setActiveView,
  isMenuOpen,
}) => {
  return (
    <li
      onClick={() => setActiveView(title)}
      className="flex cursor-pointer items-center overflow-hidden rounded-md  transition-all duration-200 ease-in-out hover:text-blue-600 hover:underline"
    >
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          {!isMenuOpen && (
            <TooltipContent className="" side="right">
              <p>{title}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <span className="hover:text-primary-500 ml-2">{title}</span>
    </li>
  );
};

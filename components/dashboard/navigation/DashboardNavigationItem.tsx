import Link from "next/link";

// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isExpanded: boolean;
};

export const DashboardNavigationItem: React.FC<Props> = ({
  title,
  href,
  icon,
  isExpanded,
}) => {
  return (
    <li>
      <Link href={`/dashboard${href}`}>
        {isExpanded && (
          <>
            {icon}
            <span>{title}</span>
          </>
        )}

        {!isExpanded && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>{icon}</TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="tooltip-text">{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Link>
    </li>
  );
};

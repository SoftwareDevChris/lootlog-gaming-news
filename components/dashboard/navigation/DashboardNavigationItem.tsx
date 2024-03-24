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
  icon: React.ReactNode;
};

export const DashboardNavigationItem: React.FC<Props> = ({ title, icon }) => {
  return (
    <li className="flex cursor-pointer items-center overflow-hidden hover:text-blue-600 hover:underline">
      <Link href={`/dashboard/${title.toLowerCase()}`} className="flex">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>{icon}</TooltipTrigger>
            <TooltipContent className="" side="bottom">
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="ml-1 hidden md:block">{title}</span>
      </Link>
    </li>
  );
};

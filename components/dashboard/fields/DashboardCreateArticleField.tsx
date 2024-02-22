// Components
import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";
import { Button } from "@/components/ui/button";

// Types
import { TCategory } from "@/types/types";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const DashboardCreateArticleField: React.FC<Props> = ({
  title,
  description,
}) => {
  return (
    <div>
      <DashboardFieldContainer>
        <div>
          <span className="font-medium text-neutral-900">{title}</span>
          <p className="pt-2 text-sm text-neutral-500">{description}</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button className="border border-neutral-300 bg-neutral-100 text-neutral-900 hover:border-neutral-200 hover:bg-neutral-200">
            <Link href="/dashboard/create-article">Open editor</Link>
          </Button>
        </div>
      </DashboardFieldContainer>
    </div>
  );
};

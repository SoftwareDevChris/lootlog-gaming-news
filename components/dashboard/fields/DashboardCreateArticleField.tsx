import { useState } from "react";
import Link from "next/link";

// Components
import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";

const CreateArticleButton = () => {
  "use client";

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      disabled={isLoading}
      onClick={() => setIsLoading(true)}
      className="border border-neutral-300 bg-neutral-100 text-neutral-900 hover:border-neutral-200 hover:bg-neutral-200"
    >
      {isLoading ? (
        <LoadingSpinner theme="orange" />
      ) : (
        <Link href="/dashboard/create-article">Open editor</Link>
      )}
    </Button>
  );
};

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
          <CreateArticleButton />
        </div>
      </DashboardFieldContainer>
    </div>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";

type Props = {
  title: string;
  description: string;
};

export const DashboardCreateArticleField: React.FC<Props> = ({
  title,
  description,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex flex-col border-b border-neutral-400 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-medium text-neutral-900">{title}</span>
          <p className="pt-2 text-sm text-neutral-500">{description}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            disabled={isLoading}
            onClick={() => setIsLoading(true)}
            className="border border-neutral-300 bg-neutral-100 text-neutral-900 hover:bg-neutral-100"
          >
            {isLoading ? (
              <LoadingSpinner theme="orange" />
            ) : (
              <Link href="/dashboard/articles/create-article">Open editor</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

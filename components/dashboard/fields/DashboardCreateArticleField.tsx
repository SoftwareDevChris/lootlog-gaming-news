"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button/Button";
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
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{title}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>

      <div className="">
        <Button
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
          className="btn-outlined"
        >
          {isLoading ? (
            <LoadingSpinner theme="orange" />
          ) : (
            <Link href="/dashboard/articles/create-article" className="text-xs">
              Open editor
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";

// Types
import { TDashboardViews, TUser } from "@/types/types";

// Components
import { LoadingSpinner } from "../ui/loading";

import { DashboardAccountView } from "./views/DashboardAccountView";
import { DashboardSettingsView } from "./views/DashboardSettingsView";
import { DashboardUsersView } from "./views/DashboardUsersView";
import { DashboardArticlesView } from "./views/DashboardArticlesView";

import { deleteUser } from "@/lib/auth";
import { DashboardNavigation } from "./navigation/DashboardNavigation";

type Props = {
  userData: {
    data: TUser | null;
    error: string | null;
  };
};

export const Dashboard: React.FC<Props> = ({ userData }) => {
  const [activeView, setActiveView] = useState<TDashboardViews>("Account");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteUserHandler = async () => {
    const response = await deleteUser();
    console.log(response);
  };

  if (!userData.data) {
    const errorMsg = userData.error
      ? "Error: " + userData.error
      : "No data found";
    setErrorMessage(errorMsg);
    return null;
  }

  const selectActiveView = (activeView: TDashboardViews) => {
    if (!userData.data) return null;

    switch (activeView) {
      case "Account":
        return <DashboardAccountView data={userData.data} />;
      case "Users":
        return <DashboardUsersView data={userData.data} />;
      case "Articles":
        return <DashboardArticlesView data={userData.data} />;
      case "Settings":
        return <DashboardSettingsView data={userData.data} />;
    }
  };

  return (
    <div className="grid h-screen pb-8 pl-8 pt-8 md:grid-cols-4 md:grid-rows-1">
      <DashboardNavigation
        data={userData.data}
        activeView={activeView}
        setActiveView={(view) => setActiveView(view)}
      />
      <div className="col-span-3 overflow-hidden rounded-l-2xl bg-neutral-200 p-8">
        <h1 className="mb-8 text-2xl font-semibold text-neutral-900">
          {activeView}
        </h1>

        {selectActiveView(activeView)}
      </div>
    </div>
  );
};

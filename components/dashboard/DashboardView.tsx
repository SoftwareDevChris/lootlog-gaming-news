"use client";

import { useCallback, useEffect, useState } from "react";

// Queries
import { getUserById } from "@/lib/queries";

// Types
import { TDashboardViews, TUser } from "@/types/types";

// Components
import { LoadingSpinner } from "@/components/ui/loading";

import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { DashboardViewContainer } from "@/components/dashboard/containers/DashboardViewContainer";
import { DashboardAccountView } from "@/components/dashboard/views/DashboardAccountView";
import { DashboardSettingsView } from "@/components/dashboard/views/DashboardSettingsView";
import { DashboardUsersView } from "@/components/dashboard/views/DashboardUsersView";
import { DashboardArticlesView } from "@/components/dashboard/views/DashboardArticlesView";
import { useUser } from "@clerk/nextjs";

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<TDashboardViews>("Account");
  const [userData, setUserData] = useState<TUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const user = useUser();

  const getUserData = useCallback(async () => {
    const res = await getUserById(user.user?.id!);

    if (res.status === 201) {
      setUserData(res.user);
    } else setErrorMessage(res.error);
  }, [user.user?.id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // -------
  // Loading
  // -------
  if (!userData && !errorMessage) {
    return (
      <div className="mx-auto h-36 w-36 bg-transparent">
        <LoadingSpinner theme="orange" />
      </div>
    );
  }

  // -------
  // Error
  // -------
  if (!userData && errorMessage) {
    return (
      <div className="m-32 mx-auto h-32 w-full p-4 text-center">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  const setActiveViewHandler = (activeView: TDashboardViews) => {
    if (!userData) return null;

    switch (activeView) {
      case "Account":
        return <DashboardAccountView user={userData} />;
      case "Users":
        return <DashboardUsersView />;
      case "Articles":
        return <DashboardArticlesView />;
      case "Settings":
        return <DashboardSettingsView />;
    }
  };

  return (
    <>
      <DashboardNavigation user={userData} setActiveView={setActiveView} />
      <DashboardViewContainer>
        {setActiveViewHandler(activeView)}
      </DashboardViewContainer>
    </>
  );
};

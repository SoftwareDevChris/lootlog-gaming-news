"use client";

import { useCallback, useEffect, useState } from "react";

// Queries
import { getUserById } from "@/lib/queries";

// Types
import { TDashboardViews, TUser } from "@/types/types";

// Components
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { DashboardViewContainer } from "@/components/dashboard/containers/DashboardViewContainer";
import { DashboardAccountView } from "@/components/dashboard/views/DashboardAccountView";
import { DashboardSettingsView } from "@/components/dashboard/views/DashboardSettingsView";
import { DashboardUsersView } from "@/components/dashboard/views/DashboardUsersView";
import { DashboardArticlesView } from "@/components/dashboard/views/DashboardArticlesView";
import { OverlayLoading } from "../overlays/OverlayLoading";

type Props = {
  clerkUser: {
    id: string;
  };
};

export const DashboardViewHandler: React.FC<Props> = ({ clerkUser }) => {
  const [activeView, setActiveView] = useState<TDashboardViews>("Account");
  const [userData, setUserData] = useState<TUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getUserData = useCallback(async () => {
    const res = await getUserById(clerkUser.id);

    if (res.status === 201) {
      setUserData(res.user);
    } else setErrorMessage(res.error);
  }, [clerkUser.id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // -------
  // Loading
  // -------
  if (!userData && !errorMessage) {
    return <OverlayLoading />;
  }

  // -------
  // Error
  // -------
  if (!userData && errorMessage !== null) {
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

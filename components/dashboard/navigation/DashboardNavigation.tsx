"use client";

import { TDashboardViews, TUser } from "@/types/types";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline, IoDocumentsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

type Props = {
  data: TUser;
  activeView: TDashboardViews;
  setActiveView: (view: TDashboardViews) => void;
};

export const DashboardNavigation: React.FC<Props> = ({
  data,
  activeView,
  setActiveView,
}) => {
  const userRole = data.role;

  const setActiveViewHandler = (view: TDashboardViews) => {
    setActiveView(view);
  };

  return (
    <div className="h-full md:col-span-1">
      {/* User Icon & Name */}
      <div className="flex items-center">
        <FaUserCircle size={42} />
        <div className="ml-3">
          <h6 className="h-fit text-lg font-bold text-neutral-950">
            {data.firstName}
          </h6>
          <span className="text-sm text-neutral-500">{data.email}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <span className="text-xs font-medium uppercase text-neutral-400">
          Menu
        </span>
        <ul className="mt-4 space-y-6">
          {/* ALL USERS */}
          <DashboardNavigationItem
            activeView={activeView}
            setActiveView={setActiveViewHandler}
            title="Account"
            icon={<HiOutlineUser size={20} />}
          />

          {/* ADMIN ONLY */}
          {userRole === "ADMIN" ? (
            <DashboardNavigationItem
              activeView={activeView}
              setActiveView={setActiveViewHandler}
              title="Users"
              icon={<FiUsers size={20} />}
            />
          ) : null}

          {/* ADMIN AND AUTHORS ONLY */}
          {userRole === "ADMIN" || userRole === "AUTHOR" ? (
            <DashboardNavigationItem
              activeView={activeView}
              setActiveView={setActiveViewHandler}
              title="Articles"
              icon={<IoDocumentsOutline size={20} />}
            />
          ) : null}

          <DashboardNavigationItem
            activeView={activeView}
            setActiveView={setActiveViewHandler}
            title="Settings"
            icon={<IoSettingsOutline size={20} />}
          />
        </ul>
      </div>
    </div>
  );
};

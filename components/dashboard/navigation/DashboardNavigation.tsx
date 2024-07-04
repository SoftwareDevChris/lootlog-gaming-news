"use client";
import "./DashboardNavigation.scss";

import { useState } from "react";

// Types
import { TUser } from "@/types/types";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import {
  FaUser,
  FaGear,
  FaNewspaper,
  FaArrowRight,
  FaArrowLeft,
  FaHeart,
  FaUsers,
} from "react-icons/fa6";

import { FaBox } from "react-icons/fa";

type Props = {
  user: TUser | null;
};

export const DashboardNavigation: React.FC<Props> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const userRole = user?.role;
  const iconSize = 16;

  return (
    <div
      className={`sidebar
      ${isExpanded ? "w-[200px]" : "w-[57px]"} `}
    >
      {/* Navigation */}
      <ul>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <FaArrowLeft size={iconSize} />
          ) : (
            <FaArrowRight size={iconSize} />
          )}
        </button>

        <DashboardNavigationItem
          title="My account"
          href="/account"
          icon={<FaUser size={iconSize} />}
          isExpanded={isExpanded}
        />

        <DashboardNavigationItem
          title="Likes"
          href="/account/likes"
          icon={<FaHeart size={iconSize} />}
          isExpanded={isExpanded}
        />

        <DashboardNavigationItem
          title="Settings"
          href="/account/settings"
          icon={<FaGear size={iconSize} />}
          isExpanded={isExpanded}
        />

        {/* Admin */}
        {userRole === "ADMIN" && (
          <>
            {/* Divider */}
            <div className="dashboard-nav-divider"></div>

            <DashboardNavigationItem
              title="Users"
              href="/admin/users"
              icon={<FaUsers size={iconSize} />}
              isExpanded={isExpanded}
            />

            <DashboardNavigationItem
              title="Articles"
              href="/admin/articles"
              icon={<FaNewspaper size={iconSize} />}
              isExpanded={isExpanded}
            />

            <DashboardNavigationItem
              title="Categories"
              href="/articles/categories"
              icon={<FaBox size={iconSize} />}
              isExpanded={isExpanded}
            />
          </>
        )}
      </ul>
    </div>
  );
};

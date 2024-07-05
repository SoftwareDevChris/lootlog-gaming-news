"use client";
import "./DashboardNavigation.scss";

import { useState } from "react";

// Types
import { TUser } from "@/types/types";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import {
  FiArrowLeft,
  FiArrowRight,
  FiBox,
  FiEdit,
  FiFolder,
  FiHeart,
  FiInbox,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";

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
            <FiArrowLeft size={iconSize} />
          ) : (
            <FiArrowRight size={iconSize} />
          )}
        </button>

        <DashboardNavigationItem
          title="My account"
          href="/user"
          icon={<FiUser size={iconSize} />}
          isExpanded={isExpanded}
        />

        {/* Authors & Admins */}
        {userRole === "AUTHOR" ||
          (userRole === "ADMIN" && (
            <>
              <DashboardNavigationItem
                title="New article"
                href="/author/new-article"
                icon={<FiEdit size={iconSize} />}
                isExpanded={isExpanded}
              />
              <DashboardNavigationItem
                title="My articles"
                href="/author/my-articles"
                icon={<FiFolder size={iconSize} />}
                isExpanded={isExpanded}
              />
            </>
          ))}

        <DashboardNavigationItem
          title="Likes"
          href="/user/likes"
          icon={<FiHeart size={iconSize} />}
          isExpanded={isExpanded}
        />

        <DashboardNavigationItem
          title="Settings"
          href="/user/settings"
          icon={<FiSettings size={iconSize} />}
          isExpanded={isExpanded}
        />

        {/* Admin */}
        {userRole === "ADMIN" && (
          <>
            {/* Divider */}
            <div className="dashboard-nav-divider"></div>

            <DashboardNavigationItem
              title="Articles"
              href="/admin/articles"
              icon={<FiInbox size={iconSize} />}
              isExpanded={isExpanded}
            />

            <DashboardNavigationItem
              title="Categories"
              href="/admin/categories"
              icon={<FiBox size={iconSize} />}
              isExpanded={isExpanded}
            />

            <DashboardNavigationItem
              title="Users"
              href="/admin/users"
              icon={<FiUsers size={iconSize} />}
              isExpanded={isExpanded}
            />
          </>
        )}
      </ul>
    </div>
  );
};

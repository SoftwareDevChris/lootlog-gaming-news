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
import { getSession } from "@/lib/session";

export const DashboardNavigation: React.FC = async () => {
  const session = await getSession();

  const userRole = session?.user.role;

  return (
    <div className="sidebar">
      {/* Navigation */}
      <ul>
        <DashboardNavigationItem
          title="My account"
          href="/user"
          icon={<FiUser />}
        />

        {/* Authors & Admins */}
        {userRole === "AUTHOR" ||
          (userRole === "ADMIN" && (
            <>
              <DashboardNavigationItem
                title="New article"
                href="/author/new-article"
                icon={<FiEdit />}
              />
              <DashboardNavigationItem
                title="My articles"
                href="/author/my-articles"
                icon={<FiFolder />}
              />
            </>
          ))}

        <DashboardNavigationItem
          title="Likes"
          href="/user/likes"
          icon={<FiHeart />}
        />

        <DashboardNavigationItem
          title="Settings"
          href="/user/settings"
          icon={<FiSettings />}
        />

        {/* Admin */}
        {userRole === "ADMIN" && (
          <>
            {/* Divider */}
            <div className="dashboard-nav-divider"></div>

            <DashboardNavigationItem
              title="Articles"
              href="/admin/articles"
              icon={<FiInbox />}
            />

            <DashboardNavigationItem
              title="Categories"
              href="/admin/categories"
              icon={<FiBox />}
            />

            <DashboardNavigationItem
              title="Users"
              href="/admin/users"
              icon={<FiUsers />}
            />
          </>
        )}
      </ul>
    </div>
  );
};

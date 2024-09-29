import { getCurrentUserFromServer } from "@/lib/user";
import "./DashboardNavigation.scss";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import {
  FiBox,
  FiEdit,
  FiFolder,
  FiHeart,
  FiInbox,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export const DashboardNavigation = async () => {
  const user = await getCurrentUserFromServer();

  if (!user?.id) return null;

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
        {user?.role === "AUTHOR" ||
          (user?.role === "ADMIN" && (
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
        {user?.role === "ADMIN" && (
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

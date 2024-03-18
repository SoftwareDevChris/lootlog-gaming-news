// Types
import { TDashboardViews, TUser } from "@/types/types";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline, IoDocumentsOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiUsers } from "react-icons/fi";

type Props = {
  user: TUser | null;
};

export const DashboardNavigation: React.FC<Props> = ({ user }) => {
  const userRole = user?.role;
  const iconSize = 20;

  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden bg-neutral-100 px-2`}
    >
      {/* Navigation */}
      <ul className={`mt-4 flex space-x-4 lg:my-4`}>
        {/* ALL USERS */}
        <DashboardNavigationItem
          title="Account"
          icon={<HiOutlineUser size={iconSize} />}
        />

        {/* ADMIN ONLY */}
        {userRole === "ADMIN" ? (
          <DashboardNavigationItem
            title="Users"
            icon={<FiUsers size={iconSize} />}
          />
        ) : null}

        {/* ADMIN AND AUTHORS ONLY */}
        {userRole === "ADMIN" || userRole === "AUTHOR" ? (
          <DashboardNavigationItem
            title="Articles"
            icon={<IoDocumentsOutline size={iconSize} />}
          />
        ) : null}

        <DashboardNavigationItem
          title="Settings"
          icon={<IoSettingsOutline size={iconSize} />}
        />
      </ul>
    </div>
  );
};

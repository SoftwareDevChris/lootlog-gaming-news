"use client";
import { useState } from "react";

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
  setActiveView: React.Dispatch<React.SetStateAction<TDashboardViews>>;
};

export const DashboardNavigation: React.FC<Props> = ({
  user,
  setActiveView,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const userRole = user?.role;

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden bg-neutral-100 px-3 transition-[max-width] delay-0 duration-300 ease-linear ${
        isMenuOpen ? "max-w-36" : "max-w-12"
      }`}
    >
      {/* Navigation */}
      <div className="">
        <div
          className="flex cursor-pointer items-end"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <IoIosArrowBack
              size={25}
              className="text-neutral-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          ) : (
            <IoIosArrowForward
              size={25}
              className="text-neutral-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          )}
        </div>
        <ul className={`mt-4 flex flex-col space-y-4 lg:my-4`}>
          {/* ALL USERS */}
          <DashboardNavigationItem
            isMenuOpen={isMenuOpen}
            title="Account"
            icon={<HiOutlineUser size={24} />}
            setActiveView={setActiveView}
          />

          {/* ADMIN ONLY */}
          {userRole === "ADMIN" ? (
            <DashboardNavigationItem
              isMenuOpen={isMenuOpen}
              title="Users"
              icon={<FiUsers size={24} />}
              setActiveView={setActiveView}
            />
          ) : null}

          {/* ADMIN AND AUTHORS ONLY */}
          {userRole === "ADMIN" || userRole === "AUTHOR" ? (
            <DashboardNavigationItem
              isMenuOpen={isMenuOpen}
              title="Articles"
              icon={<IoDocumentsOutline size={24} />}
              setActiveView={setActiveView}
            />
          ) : null}

          <DashboardNavigationItem
            isMenuOpen={isMenuOpen}
            title="Settings"
            icon={<IoSettingsOutline size={24} />}
            setActiveView={setActiveView}
          />
        </ul>
      </div>
    </div>
  );
};

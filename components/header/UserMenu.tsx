"use client";
import { useState } from "react";
import Link from "next/link";

import OutsideClickHandler from "react-outside-click-handler";
import toast from "react-hot-toast";

import { deleteCookie } from "@/lib/cookies";

import { FaUserCircle } from "react-icons/fa";
import { useUserStore } from "@/store/user-store";

export const UserMenu = () => {
  const user = useUserStore().user;
  const setUser = useUserStore().setUser;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const logoutHandler = async () => {
    await deleteCookie("jwt");
    setUser(null);
    toast("You are now logged out", { position: "bottom-right" });
  };

  return (
    <>
      <div className="user-menu-wrapper">
        <FaUserCircle
          size={28}
          className="cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />

        <OutsideClickHandler
          onOutsideClick={() => {
            isUserMenuOpen && setIsUserMenuOpen(false);
          }}
        >
          {isUserMenuOpen && (
            <ul className="user-nav-list">
              {user ? (
                <>
                  <li>
                    <Link
                      prefetch={false}
                      href="/dashboard/user"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      prefetch={false}
                      href="/sign-in"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch={false}
                      href="/sign-up"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </OutsideClickHandler>
      </div>
    </>
  );
};

"use client";

import { useState } from "react";

// Next
import Link from "next/link";

import { TAuthCookie } from "@/types/types";

import { FaUserCircle } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

import toast from "react-hot-toast";
import { signOut } from "@/lib/authService";

type Props = {
  session: TAuthCookie | null;
};

export const UserMenu: React.FC<Props> = ({ session }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const logoutHandler = async () => {
    await signOut();
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
              {session?.user ? (
                <>
                  <li>
                    <Link
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
                      href="/sign-in"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
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

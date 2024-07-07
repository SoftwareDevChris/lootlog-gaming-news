"use client";

import { useState } from "react";

// Next
import Link from "next/link";

import { TAuthCookie } from "@/types/types";

import { FaUserCircle } from "react-icons/fa";

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
    <div className="col-start-4 col-end-5 row-start-1 row-end-2 w-fit items-center justify-self-end">
      <FaUserCircle
        size={28}
        className="cursor-pointer"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      />

      {isUserMenuOpen && (
        <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
          {session?.user ? (
            <>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link
                  href="/dashboard/user"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/sign-in" onClick={() => setIsUserMenuOpen(false)}>
                  Sign in
                </Link>
              </li>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/sign-up" onClick={() => setIsUserMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

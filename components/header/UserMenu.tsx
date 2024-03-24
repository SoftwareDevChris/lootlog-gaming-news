"use client";

import { useState } from "react";

// Next
import Link from "next/link";

// Icons
import { FaUserCircle } from "react-icons/fa";

// Clerk Auth
import { useUser, useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const UserMenu: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  const logoutHandler = () => {
    signOut();
    toast.success("You have been logged out.");
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="col-start-4 col-end-5 row-start-1 row-end-2 w-fit items-center justify-self-end">
      <FaUserCircle
        size={28}
        className="cursor-pointer"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      />

      {isUserMenuOpen && (
        <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
          {isSignedIn ? (
            <>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link
                  href="/dashboard/account"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/login" onClick={() => setIsUserMenuOpen(false)}>
                  Sign in
                </Link>
              </li>
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/register" onClick={() => setIsUserMenuOpen(false)}>
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

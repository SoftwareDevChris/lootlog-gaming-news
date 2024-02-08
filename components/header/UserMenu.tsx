"use client";

import { useContext, useState } from "react";

// Next
import Link from "next/link";

// Context
import { AuthContext } from "@/context/auth";

// Icons
import { FaUserCircle } from "react-icons/fa";

// Clerk Auth
import { useUser, useClerk } from "@clerk/nextjs";

export const UserMenu: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    signOut();
    authContext.signOut();
  };

  return (
    <div className="col-start-4 col-end-5 row-start-1 row-end-2 w-fit items-center justify-self-end">
      <FaUserCircle
        size={28}
        className="cursor-pointer"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        onBlur={() => setIsUserMenuOpen(false)}
      />

      {isUserMenuOpen &&
        (isSignedIn ? (
          <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
            <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
              <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
              <Link href="/" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
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
          </ul>
        ))}
    </div>
  );
};

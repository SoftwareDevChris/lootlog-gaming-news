"use client";
import { useState, useContext } from "react";

// Next
import Link from "next/link";

// Clerk Auth
import { useUser, useClerk } from "@clerk/nextjs";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

// Routes
import { ROUTES } from "@/utils/routes";

// Context
import { AuthContext } from "@/context/auth";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    signOut();
    authContext.signOut();
  };

  return (
    <header className="sticky top-0 z-50 grid h-16 grid-cols-4 grid-rows-1 items-center justify-between bg-neutral-900/90 p-4 text-white">
      {/* Logo and title */}
      <div className="col-start-2 col-end-4 row-start-1 row-end-2 flex w-fit items-center place-self-center pt-1 md:col-start-1 md:col-end-2 md:place-self-start">
        <Link href="/">
          <h1 className="text-center font-PressStart text-lg font-normal uppercase">
            Game
            <span className="text-custom-amber-800">Zone</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="col-span-2 col-start-1 col-end-2 row-start-1 row-end-2 w-fit md:col-start-2 md:col-end-4 md:w-full">
        {/* Mobile Menu */}
        <div className="block md:hidden">
          {isMenuOpen ? (
            <IoCloseOutline
              size={30}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenu
              size={30}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}

          {isMenuOpen && (
            <ul className="absolute left-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md md:hidden">
              {ROUTES.map((item) => (
                <li
                  key={item.name}
                  className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white"
                >
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden justify-center md:flex">
          {ROUTES.map((item) => (
            <li
              key={item.name}
              className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User icon */}

      <div className="col-start-4 col-end-5 row-start-1 row-end-2 w-fit items-center justify-self-end">
        <FaUserCircle
          size={28}
          className="cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />

        {isUserMenuOpen &&
          (isSignedIn ? (
            <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link
                  href="/dashboard"
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
            </ul>
          ) : (
            <ul className="absolute right-0 top-16 z-50 w-40 space-y-4 rounded-b-md bg-neutral-900 py-4 shadow-md">
              <li className="mx-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                <Link href="/login" onClick={() => setIsUserMenuOpen(false)}>
                  Login
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
    </header>
  );
};

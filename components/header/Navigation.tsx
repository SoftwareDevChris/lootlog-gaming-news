"use client";

import { useState } from "react";

import Link from "next/link";

// Icons
import { IoCloseOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

// Routes
import { ROUTES } from "@/utils/routes";

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
                onClick={() => setIsMenuOpen(false)}
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
  );
};

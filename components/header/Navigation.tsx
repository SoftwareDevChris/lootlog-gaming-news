"use client";

import { useState } from "react";

import Link from "next/link";

import OutsideClickHandler from "react-outside-click-handler";

// Icons
import { IoCloseOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

// Routes
import { ROUTES } from "@/utils/routes";

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="header-navigation">
      {/* Mobile Menu */}

      <OutsideClickHandler
        onOutsideClick={() => isMenuOpen && setIsMenuOpen(false)}
      >
        <div className="mobile-menu-wrapper">
          {isMenuOpen ? (
            <IoCloseOutline size={30} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <HiMenu size={30} onClick={() => setIsMenuOpen(true)} />
          )}

          {isMenuOpen && (
            <ul className="mobile-nav-list">
              {ROUTES.map((route) => (
                <li onClick={() => setIsMenuOpen(false)} key={route.name}>
                  <Link prefetch={false} href={route.path}>
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </OutsideClickHandler>

      {/* Desktop Menu */}
      <ul className="desktop-nav-list">
        {ROUTES.map((item) => (
          <li key={item.name}>
            <Link prefetch={false} href={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

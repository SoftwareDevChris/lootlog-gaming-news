import Image from "next/image";
import Link from "next/link";

import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

// Items to display in the navigation
const MENU_ITEMS = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "News",
    link: "/news",
  },
  {
    text: "Reviews",
    link: "/reviews",
  },
  {
    text: "About",
    link: "/about",
  },
];

// Navigation item component
const NavItem: React.FC<{ text: string; link: string }> = ({ text, link }) => {
  return (
    <li className="mx-3 text-sm font-medium text-gray-300 hover:text-white cursor-pointer">
      <Link href={link}>{text}</Link>
    </li>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="grid grid-cols-4 grid-rows-1 items-center justify-between p-4 bg-neutral-900 text-white">
      {/* Logo and title */}
      <div className="flex items-center w-fit row-start-1 row-end-2 col-start-2 col-end-4 place-self-center md:place-self-start md:col-start-1 md:col-end-2">
        <h1 className="uppercase text-lg text-center font-normal font-PressStart">
          <span className="text-custom-amber-800">Gaming</span> News
        </h1>
      </div>

      {/* Navigation menu */}
      <nav className="w-fit md:w-full row-start-1 col-span-2 col-start-1 col-end-2 row-end-2 md:col-start-2 md:col-end-4">
        {/* Mobile Menu */}
        <div className="block md:hidden">
          <HiMenu size={30} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center">
          {MENU_ITEMS.map((item) => (
            <NavItem key={item.link} text={item.text} link={item.link} />
          ))}
        </ul>
      </nav>

      {/* Navigation icons */}
      <div className="w-fit items-center justify-self-end col-start-4 col-end-5 row-start-1 row-end-2">
        <FaUserCircle size={28} />
      </div>
    </header>
  );
};

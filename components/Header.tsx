// Next
import Link from "next/link";

// Components
import { UserMenu } from "./header/UserMenu";
import { Navigation } from "./header/Navigation";

export const Header: React.FC = () => {
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
      <Navigation />

      {/* User Menu */}
      <UserMenu />
    </header>
  );
};

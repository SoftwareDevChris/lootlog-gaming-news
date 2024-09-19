import Link from "next/link";

import { getSession } from "@/lib/session";

// Components
import { UserMenu } from "./UserMenu";
import { Navigation } from "./Navigation";
import { Logo } from "../logo/Logo";

export const Header: React.FC = async () => {
  const session = await getSession();

  return (
    <header>
      <div className="header-content">
        <Logo />

        {/* Navigation */}
        <Navigation />

        {/* User Menu */}
        <UserMenu session={session} />
      </div>
    </header>
  );
};

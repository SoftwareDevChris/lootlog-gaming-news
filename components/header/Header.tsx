import "./Header.scss";

// Next
import Link from "next/link";

import { getSession } from "@/lib/sessionService";

// Components
import { UserMenu } from "./UserMenu";
import { Navigation } from "./Navigation";

export const Header: React.FC = async () => {
  const session = await getSession();

  return (
    <header>
      <div className="header-content">
        {/* Logo and title */}
        <div className="logo-wrapper">
          <Link href="/">
            <h1>
              Loot
              <span>Log</span>
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* User Menu */}
        <UserMenu session={session} />
      </div>
    </header>
  );
};

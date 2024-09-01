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
          <Link prefetch={false} href="/">
            <h1 className="logo">
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

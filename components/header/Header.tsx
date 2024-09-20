// Components
import { UserMenu } from "./UserMenu";
import { Navigation } from "./Navigation";
import { Logo } from "../logo/Logo";

export const Header: React.FC = async () => {
  return (
    <header>
      <div className="header-content">
        <Logo />

        {/* Navigation */}
        <Navigation />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

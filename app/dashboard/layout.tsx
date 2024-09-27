import { QueryClient } from "@tanstack/react-query";
import "./DashboardLayout.scss";

import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="dashboard-page">
      <DashboardNavigation />
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;

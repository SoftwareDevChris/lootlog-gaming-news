import "./DashboardLayout.scss";

// Clerk
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="dashboard-page">
      <DashboardNavigation />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;

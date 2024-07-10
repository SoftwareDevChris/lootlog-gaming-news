import "./DashboardLayout.scss";

// Clerk
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="dashboard-grid flex-grow">
      <DashboardNavigation />
      <div className="dashboard-page">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import "./DashboardLayout.scss";

// Clerk
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="dashboard-grid flex-grow">
      {/* <DashboardNavigation user={userDetails.user} /> */}
      <div className="dashboard-page">{children}</div>
    </div>
  );
};

export default DashboardLayout;

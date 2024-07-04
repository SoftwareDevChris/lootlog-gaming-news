import "./DashboardLayout.scss";

import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs";
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { getUserByClerkId } from "@/lib/queries";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const getUserDetails = await getUserByClerkId(user!.id);

  return (
    <div className="dashboard-grid flex-grow">
      <DashboardNavigation user={getUserDetails.user} />
      <div className="dashboard-page">{children}</div>
    </div>
  );
};

export default DashboardLayout;

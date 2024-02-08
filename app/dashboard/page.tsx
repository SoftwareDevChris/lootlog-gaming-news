// Components
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { AuthorDashboard } from "@/components/dashboards/AuthorDashboard";
import { UserDashboard } from "@/components/dashboards/UserDashboard";
import { LoadingSpinner } from "@/components/ui/loading";

import { auth } from "@clerk/nextjs";

// Queries
import { getUserByEmail } from "@/lib/queries";

export default async function DashboardPage() {
  const userData = await getUserByEmail();

  const currentUser = auth();
  console.log(currentUser);

  if (!userData.data) {
    return (
      <div className="m-32 mx-auto h-32 w-32 p-4">
        <LoadingSpinner theme="blue" />
      </div>
    );
  }

  switch (userData.data.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "AUTHOR":
      return <AuthorDashboard />;
    default:
      return <UserDashboard userData={userData} />;
  }
}

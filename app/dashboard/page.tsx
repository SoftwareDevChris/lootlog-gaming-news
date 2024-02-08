// Components
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LoadingSpinner } from "@/components/ui/loading";

// Queries
import { getUserByEmail } from "@/lib/queries";

export default async function DashboardPage() {
  const userData = await getUserByEmail();

  if (!userData.data) {
    return (
      <div className="m-32 mx-auto h-32 w-32 p-4">
        <LoadingSpinner theme="blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-100">
      <Dashboard userData={userData} />
    </div>
  );
}

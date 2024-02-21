import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs";

// Components
import { Dashboard } from "@/components/dashboard/DashboardView";

export default async function DashboardPage() {
  const user = await currentUser();

  // If no user is logged in, redirect to the home page
  if (!user) {
    redirect("/");
  }

  return <Dashboard />;
}

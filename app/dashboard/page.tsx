import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs";

// Components
import { DashboardViewHandler } from "@/components/dashboard/DashboardViewHandler";

export default async function DashboardPage() {
  const user = await currentUser();

  // If no user is logged in, redirect to the home page
  if (!user) {
    redirect("/");
  }

  return <DashboardViewHandler clerkUser={{ id: user.id }} />;
}

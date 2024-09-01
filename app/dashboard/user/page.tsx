import { redirect } from "next/navigation";

import { getSession } from "@/lib/sessionService";

import { DashboardDeleteAccountField } from "@/components/dashboard/fields/DashboardDeleteAccountField";
import { DashboardField } from "@/components/dashboard/fields/DashboardField";

export default async function AccountPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="account-page">
      <h1>Account details</h1>

      <div style={{ marginTop: "1rem" }}>
        <DashboardField
          label="Name"
          description="Your full name."
          value={`${session?.user.firstName} ${session?.user.lastName}`}
        />
        <DashboardField
          label="Email"
          description="The email address associated with your account."
          value={session?.user.email}
        />

        <DashboardField
          label="Role"
          description="Your role on the website."
          value={session?.user.role}
        />
        <DashboardDeleteAccountField
          userId={session.user.id}
          label="Delete Account"
          description="This will permanently delete your account."
        />
      </div>
    </div>
  );
}

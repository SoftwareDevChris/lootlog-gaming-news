import { redirect } from "next/navigation";

import { getUserDetails } from "@/lib/user";

import { DashboardField } from "@/components/dashboard/fields/DashboardField";
import { DashboardFieldWithButton } from "@/components/dashboard/fields/DashboardFieldWithButton";
import { SignOutButton } from "@/components/buttons/signOut/SignOutButton";

export default async function AccountPage() {
  const user = await getUserDetails();

  if (!user?.id) redirect("/login");

  return (
    <div className="account-page">
      <h1>Account details</h1>

      <div style={{ marginTop: "1rem" }}>
        <DashboardField
          label="Name"
          description="Your full name."
          value={`${user?.firstName} ${user?.lastName}`}
          type="name"
        />
        <DashboardField
          label="Email"
          description="The email address associated with your account."
          value={user?.email}
        />

        <DashboardField
          label="Role"
          description="Your role on the website."
          value={user?.role}
        />
        <DashboardFieldWithButton
          label="Sign out"
          description="Sign out of your account."
          button={<SignOutButton />}
        />
      </div>
    </div>
  );
}

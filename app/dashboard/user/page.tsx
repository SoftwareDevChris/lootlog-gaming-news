import { redirect } from "next/navigation";

import { getCurrentUserFromServer } from "@/lib/user";

import { DashboardField } from "@/components/dashboard/fields/DashboardField";
import { DashboardFieldWithButton } from "@/components/dashboard/fields/DashboardFieldWithButton";
import { SignOutButton } from "@/components/buttons/SignOutButton";

export default async function AccountPage() {
  const user = await getCurrentUserFromServer();

  console.log("User from account page:", user);

  if (!user?.id) redirect("/login");

  return (
    <div className="account-page">
      <h1>My account</h1>

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

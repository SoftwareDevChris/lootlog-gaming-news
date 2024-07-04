import { DashboardDeleteAccountField } from "@/components/dashboard/fields/DashboardDeleteAccountField";
import { DashboardField } from "@/components/dashboard/fields/DashboardField";
import { getUserByClerkId } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";

export default async function AccountPage() {
  const clerkUser = await currentUser();
  const userDetails = await getUserByClerkId(clerkUser?.id ?? "");

  return (
    <div className="account-page">
      <h1>Account details</h1>

      <DashboardField
        label="Name"
        description="Your full name."
        value={`${userDetails.user?.firstName} ${userDetails.user?.lastName}`}
      />
      <DashboardField
        label="Email"
        description="The email address associated with your account."
        value={userDetails.user?.email ?? "N/A"}
      />
      {/* <Dashboard2StepVerificationField
        label="Two-Step Verification"
        description="Adds an extra layer of security to your account."
      /> */}
      <DashboardField
        label="Role"
        description="Your role on the website."
        value={userDetails.user?.role ?? "N/A"}
      />
      <DashboardDeleteAccountField
        label="Delete Account"
        description="This will permanently delete your account."
      />
    </div>
  );
}

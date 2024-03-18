import { Dashboard2StepVerificationField } from "@/components/dashboard/fields/Dashboard2StepVerificationField";
import { DashboardBioField } from "@/components/dashboard/fields/DashboardBioField";
import { DashboardDeleteAccountField } from "@/components/dashboard/fields/DashboardDeleteAccountField";
import { DashboardInfoField } from "@/components/dashboard/fields/DashboardInfoField";
import { getUserById } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";

export default async function AccountPage() {
  const user = await currentUser();
  const userDetails = await getUserById(user!.id);

  return (
    <>
      <DashboardInfoField
        title="Name"
        description="Your full name."
        value={`${userDetails.user.firstName!} ${userDetails.user.lastName!}`}
      />
      <DashboardInfoField
        title="Email"
        description="The email address associated with your account."
        value={userDetails.user.email}
      />

      {/* BIOGRAPHY - ONLY FOR AUTHORS */}
      {userDetails.user.role === "AUTHOR" && (
        <DashboardBioField
          title="Biography"
          description="The 'About me' text displayed on your author profile page."
        />
      )}

      <DashboardInfoField
        title="Account status"
        description="The current status of your account."
        value={userDetails.user.is_active ? "Active" : "Inactive"}
      />
      <Dashboard2StepVerificationField
        title="Two-Step Verification"
        description="Adds an extra layer of security to your account."
      />
      <DashboardInfoField
        title="Role"
        description="Your role on the website."
        value={userDetails.user.role!}
      />
      <DashboardDeleteAccountField
        title="Delete Account"
        description="This will permanently delete your account."
      />
    </>
  );
}

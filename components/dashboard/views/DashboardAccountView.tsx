import { TUser } from "@/types/types";

// Components
import { DashboardInfoField } from "../fields/DashboardInfoField";
import { DashboardDeleteAccountField } from "../fields/DashboardDeleteAccountField";
import { Dashboard2StepVerificationField } from "../fields/Dashboard2StepVerificationField";
import { DashboardBioField } from "../fields/DashboardBioField";

type Props = {
  user: TUser | null;
};

export const DashboardAccountView: React.FC<Props> = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <DashboardInfoField
        title="Name"
        description="Your full name."
        value={`${user.firstName!} ${user.lastName!}`}
      />
      <DashboardInfoField
        title="Email"
        description="The email address associated with your account."
        value={user.email}
      />

      {/* BIOGRAPHY - ONLY FOR AUTHORS */}
      {user.role === "AUTHOR" && (
        <DashboardBioField
          title="Biography"
          description="The 'About me' text displayed on your author profile page."
        />
      )}

      <DashboardInfoField
        title="Account status"
        description="The current status of your account."
        value={user.is_active ? "Active" : "Inactive"}
      />
      <Dashboard2StepVerificationField
        title="Two-Step Verification"
        description="Adds an extra layer of security to your account."
      />
      <DashboardInfoField
        title="Role"
        description="Your role on the website."
        value={user.role!}
      />
      <DashboardDeleteAccountField
        title="Delete Account"
        description="This will permanently delete your account."
      />
    </>
  );
};

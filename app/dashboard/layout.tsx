import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs";
import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { getUserById } from "@/lib/queries";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const getUserDetails = await getUserById(user!.id);

  return (
    <div className="flex h-full w-full flex-grow flex-col bg-neutral-100">
      <DashboardNavigation user={getUserDetails.user} />
      <div className="mx-2 mt-2 flex h-full flex-grow flex-col rounded-t-xl bg-neutral-200 p-2 md:mx-8 md:p-8 lg:mt-0">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

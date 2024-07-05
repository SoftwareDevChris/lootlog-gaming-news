import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/lib/queries";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const clerkUser = await currentUser();
  const user = await getUserByClerkId(clerkUser!.id);

  if (user.user?.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}

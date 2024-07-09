import { redirect } from "next/navigation";

import { getSession } from "@/lib/sessionService";

export default async function UsersPage() {
  const session = await getSession();

  if (session?.user.role !== "ADMIN") redirect("/");

  return (
    <>
      <div></div>
    </>
  );
}

import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

export default async function ArticlesPage() {
  const session = await getSession();

  if (session?.user.role !== "ADMIN") redirect("/");

  return (
    <>
      <div></div>
    </>
  );
}

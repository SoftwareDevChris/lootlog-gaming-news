import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AdminDashboard } from "./admin";
import { AuthorDashboard } from "./author";

export default function Dashboard() {
  const isAdmin = false;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex justify-between">
        <h1 className="pb-4 text-4xl font-bold text-neutral-100">Dashboard</h1>
        <Button className="bg-neutral-100 text-neutral-900 hover:bg-neutral-100">
          <Link href="/dashboard/create-article">Create Article</Link>
        </Button>
      </div>

      {isAdmin ? <AdminDashboard /> : <AuthorDashboard />}
    </div>
  );
}

import { dummyArticles } from "@/utils/dummyData";

import { ArticleTable } from "./article-table";
import { columns } from "./columns";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="pb-4 text-4xl font-bold text-neutral-100">Dashboard</h1>

      <div className=" my-4 rounded-md bg-neutral-700 p-4 sm:flex">
        <ul className="flex space-x-4 text-neutral-100">
          <li className="cursor-pointer hover:underline">Articles</li>
          <li className="cursor-pointer hover:underline">Users</li>
          <li className="cursor-pointer hover:underline">Settings</li>
        </ul>
      </div>

      <div className="overflow-hidden rounded-md bg-neutral-700">
        <ArticleTable data={dummyArticles} columns={columns} />
      </div>
    </div>
  );
}

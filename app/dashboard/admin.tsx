import { DUMMY_ARTICLES } from "@/utils/dummyData";

import { ArticleTable } from "@/components/tables/ArticleTable";
import { articleColumns } from "@/components/tables/articleColumns";

export const AdminDashboard = () => {
  return (
    <>
      <div className=" my-4 rounded-md bg-neutral-700 p-4 sm:flex">
        <ul className="flex space-x-4 text-neutral-100">
          <li className="cursor-pointer hover:underline">Articles</li>
          <li className="cursor-pointer hover:underline">Users</li>
          <li className="cursor-pointer hover:underline">Settings</li>
        </ul>
      </div>

      <div className="overflow-hidden rounded-md bg-neutral-700">
        <ArticleTable data={DUMMY_ARTICLES} columns={articleColumns} />
      </div>
    </>
  );
};

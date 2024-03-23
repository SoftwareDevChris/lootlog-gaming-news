"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { getArticlesByUser } from "@/lib/queries";
import { useUser } from "@clerk/nextjs";
import { TArticle } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { set } from "zod";

type Props = {
  title: string;
  description: string;
};

export const DashboardShowArticlesField: React.FC<Props> = ({
  title,
  description,
}) => {
  const [articles, setArticles] = useState<TArticle[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();

  const getUserArticles = async () => {
    setIsLoading(true);

    if (!user.isLoaded) {
      setIsLoading(false);
      return;
    }

    const data = await getArticlesByUser(user.user?.id as string);
    setArticles(data.articles as TArticle[]);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col border-b border-neutral-400 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-medium text-neutral-900">{title}</span>
          <p className="pt-2 text-sm text-neutral-500">{description}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            disabled={isLoading}
            onClick={getUserArticles}
            className="border border-neutral-300 bg-neutral-100 text-neutral-900 hover:bg-neutral-100"
          >
            {isLoading ? (
              <LoadingSpinner theme="orange" />
            ) : articles && articles.length > 0 ? (
              "Refresh"
            ) : (
              "Load Articles"
            )}
          </Button>
        </div>
      </div>
      {articles === null ? <p>You have no articles.</p> : null}
      {articles && articles.length > 0 ? (
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Title</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr className=" odd:bg-neutral-300" key={article.id}>
                  <td className="p-1">{article.title}</td>
                  <td className="p-1">{article.is_published ? "Yes" : "No"}</td>
                  <td className="space-x-2 p-1">
                    <Link
                      href={`/dashboard/articles/edit-article/${article.id}`}
                    >
                      <Button className="bg-neutral-400">Edit</Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger className="rounded-md bg-red-600 px-3 py-2 text-neutral-100 hover:bg-red-700">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete your account?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 px-3 py-2 text-neutral-100 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  getArticlesByUser,
  toggleArticleFeatureStatusById,
  toggleArticlePublicStatusById,
} from "@/lib/queries";
import { useUser } from "@clerk/nextjs";
import { TArticle } from "@/types/types";

// Toast
import toast from "react-hot-toast";
import { get } from "http";

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

  const handleArticlePublicStatus = async (
    articleId: string,
    publicStatus: boolean,
  ) => {
    const publish = await toggleArticlePublicStatusById(
      articleId,
      publicStatus,
    );

    if (publish.status === 200) {
      toast.success("The article has been updated");
      getUserArticles();
    } else {
      toast.error("An error occurred");
    }
  };

  const handleArticleFeatureStatus = async (
    articleId: string,
    featureStatus: boolean,
  ) => {
    const feature = await toggleArticleFeatureStatusById(
      articleId,
      featureStatus,
    );

    if (feature.status === 200) {
      toast.success("The article has been updated");
      getUserArticles();
    } else {
      toast.error("An error occurred");
    }
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
              "Show articles"
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
                <th>Category</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr className=" odd:bg-neutral-300" key={article.id}>
                  <td className="p-1">{article.title}</td>
                  <td className="p-1 capitalize">{article.category?.name}</td>
                  <td className="p-1">{article.is_published ? "Yes" : "No"}</td>
                  <td className="space-x-2 p-1">
                    {/* Edit */}
                    <Link
                      href={`/dashboard/articles/edit-article/${article.id}`}
                    >
                      <Button className="bg-neutral-400">Edit</Button>
                    </Link>

                    {/* Set public status */}
                    {article.is_published ? (
                      <Button
                        onClick={() =>
                          handleArticlePublicStatus(
                            article.id!,
                            article.is_published,
                          )
                        }
                        className="bg-blue-700 text-neutral-100 hover:bg-blue-800"
                      >
                        Unpublish
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleArticlePublicStatus(
                            article.id!,
                            article.is_published,
                          )
                        }
                        className="bg-green-700 text-neutral-100 hover:bg-green-800"
                      >
                        Publish
                      </Button>
                    )}

                    {/* Set feature status */}
                    {article.is_featured ? (
                      <Button
                        onClick={() =>
                          handleArticleFeatureStatus(
                            article.id!,
                            article.is_featured,
                          )
                        }
                        className="bg-blue-700 text-neutral-100 hover:bg-blue-800"
                      >
                        Unfeature
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleArticleFeatureStatus(
                            article.id!,
                            article.is_featured,
                          )
                        }
                        className="bg-green-700 text-neutral-100 hover:bg-green-800"
                      >
                        Feature
                      </Button>
                    )}

                    {/* Delete  */}
                    <Button className="bg-red-700 text-neutral-100 hover:bg-red-800">
                      Delete
                    </Button>
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

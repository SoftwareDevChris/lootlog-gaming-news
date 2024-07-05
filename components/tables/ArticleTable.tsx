"use client";
import { FC } from "react";

import { TArticle } from "@/types/types";

import { Button } from "../ui/button/Button";
import { deleteArticle } from "@/lib/queries";
import toast from "react-hot-toast";

type Props = {
  articles: TArticle[];
};

export const ArticleTable: FC<Props> = ({ articles }) => {
  const handleDeleteArticle = async (article: TArticle) => {
    try {
      const del = await deleteArticle(article);

      if (del.status === 200) {
        toast.success("Article deleted successfully");
        articles.filter((a) => a.id !== article.id);
      } else if (del.status !== 200 && del.statusText) {
        toast.error(`Error: ${del.statusText}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error}`);
      return;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Published</th>
          <th>Category</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {articles.map((article) => (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.isPublic ? "Yes" : "No"}</td>
            <td>{article.category.name}</td>
            <td>{article.createdAt.toDateString()}</td>
            <td className="td-actions">
              <Button className="button btn-outlined">
                <span>Edit</span>
              </Button>
              <Button
                className="button btn-delete"
                onClick={() => handleDeleteArticle(article)}
              >
                <span>Delete</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

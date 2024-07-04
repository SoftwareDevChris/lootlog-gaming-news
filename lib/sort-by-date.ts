import { TArticle } from "@/types/types";

export const sortByDate = (articles: TArticle[]) => {
  const sort: TArticle[] = articles.sort((a: TArticle, b: TArticle) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return sort;
};

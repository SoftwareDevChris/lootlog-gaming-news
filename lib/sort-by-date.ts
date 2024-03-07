import { TArticle } from "@/types/types";

export const sortByDate = (articles: TArticle[]) => {
  const sort: TArticle[] = articles.sort((a: TArticle, b: TArticle) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return sort;
};

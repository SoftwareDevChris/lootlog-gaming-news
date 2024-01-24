export type TArticleContent = {
  id: string;
  date: Date;
  title: string;
  content: string;
  tags: string | string[];
  author: string;
  status: "public" | "not released" | "draft";
  isFeatured: boolean;
};

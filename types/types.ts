export type TArticle = {
  id: string;
  date: Date;
  title: string;
  content: string;
  tags: string | string[];
  author: string;
  status: "public" | "draft";
  isFeatured: boolean;
};

export type TAuthor = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  twitter: string;
  github: string;
  linkedin: string;
  articles: string[];
  isActive: boolean;
};

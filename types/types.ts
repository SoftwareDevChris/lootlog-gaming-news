export type TArticle = {
  id: string;
  created_at: Date;
  title: string;
  content: string;
  tags: string | string[];
  author: {
    name: string;
    email: string;
    id: string;
  };
  is_released: boolean;
  is_featured: boolean;
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

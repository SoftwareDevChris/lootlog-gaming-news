export type TUser = {
  id?: string;
  email: string;
  bio?: string | null;
  is_active?: boolean;
  role?: "USER" | "AUTHOR" | "ADMIN";
  firstName?: string | null;
  image_url?: string | null;
  lastName?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  github_url?: string | null;
  articles?: string[] | null;
};

export type TArticle = {
  created_at: Date;
  title: string;
  content: string;
  categoryId: number;
  authorId: string;
  image: TImage;
  is_published: boolean;
  is_featured: boolean;
  id?: string;
  author?: TUser;
  category?: TCategory;
};

export type TImage = [
  {
    id?: number;
    name: string;
    url: string;
    articleId: string;
  },
];

export type TCategory = {
  id: number;
  name: string;
  articles?: TArticle[] | null;
};

export type TTag = {
  id: string;
  name: string;
};

export type TRole = "AUTHOR" | "ADMIN" | "USER";

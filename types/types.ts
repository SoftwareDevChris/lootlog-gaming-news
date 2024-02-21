export type TArticle = {
  id?: string;
  created_at: Date;
  title: string;
  content: string;
  categoryId: number;
  authorId: string;
  is_released: boolean;
  is_featured: boolean;
  tags: string | string[];
};

export type TCategory = {
  id: number;
  name: string;
  articles: TArticle[] | null;
};

export type TTag = {
  id: string;
  name: string;
  articles: TArticle[] | null;
};

export type TRole = "AUTHOR" | "ADMIN" | "USER";

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

export type TDashboardViews = "Account" | "Articles" | "Users" | "Settings";

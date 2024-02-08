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

export type TUser = {
  id?: string;
  email: string;
  bio?: string;
  isActive?: boolean;
  role?: "USER" | "AUTHOR" | "ADMIN";
  firstName?: string | null;
  image_url?: string;
  lastName?: string | null;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  articles?: TArticle[];
};

export type TDashboardViews = "Account" | "Articles" | "Users" | "Settings";

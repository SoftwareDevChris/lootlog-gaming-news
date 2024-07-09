export type TUser = {
  id?: number;
  email: string;
  role?: "USER" | "AUTHOR" | "ADMIN";
  firstName: string;
  lastName: string;
  articles?: TArticle[] | null;
};

export type TArticle = {
  id: number;
  createdAt: Date;
  title: string;
  subtitle: string;
  body: string;

  isPublic: boolean;
  isFeatured: boolean;

  categoryId: number;
  authorId: number;

  image?: TImage | null;
  author?: TUser;
  category?: TCategory;
};

export type TImage = {
  id: number;
  name: string;
  url: string;
  articleId: number;
};

export type TCategory = {
  id: number;
  name: string;
  articles?: TArticle[] | null;
};

export type TRole = "AUTHOR" | "ADMIN" | "USER";

export type TNewArticle = {
  id?: number;
  title: string;
  subtitle: string;
  image: TImage | File | null;
  body: string;
};

export type TAuthCookie = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: TRole;
  };
};

import { TArticle } from "./article.types";

export enum UserRoleEnum {
  "USER",
  "AUTHOR",
  "ADMIN",
}

export type TUser = {
  id?: number;
  email: string;
  role?: UserRoleEnum;
  firstName: string;
  lastName: string;
  articles?: TArticle[] | null;
};

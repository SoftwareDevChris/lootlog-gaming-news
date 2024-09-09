import { UserRoleEnum } from "./user.types";

export type TAuthCookie = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRoleEnum;
  };
};

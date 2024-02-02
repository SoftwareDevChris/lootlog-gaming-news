import { TUser } from "@/types/types";

import { db } from "./db";

export const getUserByEmail = async (email: string) => {
  if (!email) throw new Error("No email provided");

  const query = await db.user.findUnique({
    where: {
      email,
    },
  });

  console.log("Get user by email:", query);
  return query;
};

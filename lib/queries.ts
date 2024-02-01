import { TUser } from "@/types/types";

import { db } from "./db";

export const getUserByEmail = async (user: TUser) => {
  if (!user.email) throw new Error("No email provided");

  const query = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  console.log("Get user by email:", query);
  return query;
};

export const createUser = async (user: TUser) => {
  await db.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  return;
};

export const findOrCreateUser = async (user: TUser) => {
  if (!user.email) throw new Error("No email provided");

  const existingUser = await getUserByEmail(user);

  if (existingUser) return existingUser;
  else return createUser(user);
};

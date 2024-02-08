// Prisma
import { prisma } from "./db";

// Clerk Auth
import { currentUser } from "@clerk/nextjs";

// Types
import { TUser } from "./../types/types";

type TReturn = {
  data: TUser | null;
  error: string | null;
};

export async function getUserByEmail(): Promise<TReturn> {
  const user = await currentUser();

  if (!user) {
    return { data: null, error: "No user was provided" };
  }

  const queryResult = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (!queryResult) {
    return { data: null, error: "No user was found" };
  }

  return { data: queryResult, error: null };
}

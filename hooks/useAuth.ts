"use client";

import { useContext } from "react";

// Clerk Auth
import { User } from "@clerk/nextjs/server";

// Context
import { AuthContext } from "@/context/auth";
import { findOrCreateUser } from "@/lib/queries";

// Types
import { TUser } from "@/types/types";

export const useSetUserState = async (user: User | null | undefined) => {
  const auth = useContext(AuthContext);

  if (!user) {
    return;
  }

  const userObj: TUser = {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const query = await findOrCreateUser(userObj);

  auth.setUser(query);
};

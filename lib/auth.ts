"use server";
import { redirect } from "next/navigation";

// Clerk Auth
import { auth, clerkClient } from "@clerk/nextjs";

import { prisma } from "./db";

// Types
import { TUser } from "@/types/types";

// ---------------------------------------------------------
// Create User
// ---------------------------------------------------------
export async function createUser(user: TUser) {
  if (!user.id) {
    return { status: 400, message: "User ID is required" };
  }

  try {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    return { status: 201, message: "User created successfully" };
  } catch (error) {
    return { status: 500, message: "There was an error creating the user" };
  }
}

// ---------------------------------------------------------
// Delete User
// ---------------------------------------------------------
export async function deleteUser() {
  const { userId } = auth();

  if (!userId) {
    return { message: "User not found" };
  }

  try {
    await clerkClient.users.deleteUser(userId);
    redirect("/");
  } catch (error) {
    return { message: "There was an error deleting the user" };
  }
}

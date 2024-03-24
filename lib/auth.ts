"use server";
import { redirect } from "next/navigation";

// Clerk Auth
import { auth, clerkClient, currentUser } from "@clerk/nextjs";

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
  const user = await currentUser();

  if (!user?.id) {
    return { status: 400, statusText: "User ID is required" };
  }

  try {
    await clerkClient.users.deleteUser(user.id);

    // Delete user from database
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return { status: 200, statusText: "User deleted successfully" };
  } catch (error) {
    return { status: 500, statusText: "There was an error deleting the user" };
  }
}

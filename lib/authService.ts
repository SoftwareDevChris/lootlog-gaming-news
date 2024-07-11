"use server";

import { prisma } from "./prismaClient";

// Types
import { comparePassword, hashPassword } from "./hashService";
import { encrypt, getSession } from "./sessionService";
import { cookies } from "next/headers";

// -----------
// Sign in
// -----------
export async function signIn(data: FormData) {
  const credentials = {
    email: data.get("email") as string,
    password: data.get("password") as string,
  };

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email.toLowerCase(),
      },
    });

    if (user) {
      const isMatching = await comparePassword(
        credentials.password,
        user.password,
      );

      if (isMatching) {
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        const session = await encrypt({
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          expires,
        });

        cookies().set({
          name: "session",
          value: session,
          expires: expires,
          httpOnly: true,
        });

        return { status: 200, message: "OK" };
      } else return { status: 400, message: "invalid credentials" };
    }
  } catch (err) {
    console.error(err);
    return { status: 500, message: "internal server error" };
  }
}

// -----------
// Sign out
// -----------
export async function signOut() {
  cookies().set("session", "", {
    expires: new Date(0),
  });
}

// -----------
// Create User
// -----------
export async function signUp(data: FormData) {
  const credentials = {
    email: data.get("email") as string,
    password: data.get("password") as string,
    repeatedPassword: data.get("repeatedPassword") as string,
    firstName: data.get("firstName") as string,
    lastName: data.get("lastName") as string,
  };

  if (credentials.password !== credentials.repeatedPassword) {
    return { status: 400, message: "passwords are not matching" };
  }

  const encryptedPassword = await hashPassword(credentials.password);

  try {
    await prisma.user.create({
      data: {
        email: credentials.email.toLowerCase(),
        password: encryptedPassword,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role: "USER",
      },
    });

    return { status: 201, message: "OK" };
  } catch (error) {
    return { status: 500, message: "internal server error" };
  }
}

// ----------------------
// Get a user by their ID
// ----------------------
export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return { status: 200, user: user, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, user: null, error: "internal server error" };
  }
}

// --------------------------
// Get all users (ADMIN ONLY)
// --------------------------
export async function getAllUsers() {
  try {
    const user = await prisma.user.findMany();

    return { status: 200, users: user, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, users: null, error: "An error occurred" };
  }
}

// ------------------------
// Delete User (ADMIN ONLY)
// ------------------------
export async function deleteUser(id: number) {
  const session = await getSession();

  console.log("session:", session);

  try {
    // Delete user from database
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return { status: 200, statusText: "OK" };
  } catch (error) {
    return { status: 500, statusText: "internal server error" };
  }
}

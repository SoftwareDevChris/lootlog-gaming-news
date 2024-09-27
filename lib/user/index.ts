"use server";

import { TUser } from "@/types/user.types";
import { getCookie } from "../auth/session";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserDetails = async () => {
  const cookie = await getCookie("session");

  try {
    const res = await fetch(`${backendUrl}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

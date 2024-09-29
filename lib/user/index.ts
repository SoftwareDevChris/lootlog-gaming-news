import { TUser } from "@/types/user.types";
import { getCookie, removeCookie } from "../auth/session";
import { signOut } from "../auth";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserDetails = async () => {
  const cookie = await getCookie("session");

  if (!cookie?.value) throw new Error("No session was found");

  try {
    const res = await fetch(`${backendUrl}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });

    if (res.ok) {
      return (await res.json()) as TUser;
    }
  } catch (error) {
    await removeCookie("session");
    await removeCookie("refresh");
    console.error("Error getting user details:", error);
    throw new Error("Failed to get user details");
  }
};

export const getAllUsers = async () => {
  const cookie = await getCookie("session");

  if (!cookie?.value) throw new Error("No session was found");

  try {
    const res = await fetch(`${backendUrl}/api/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    return (await res.json()) as TUser[];
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

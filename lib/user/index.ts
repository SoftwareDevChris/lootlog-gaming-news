import { TUser } from "@/types/user.types";
import { getCookie, removeCookie } from "../auth/session";

const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER;

export const getCurrentUserFromServer = async () => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`${serverUrl}/api/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });

    const fromJson = await res.json();
    return fromJson;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};

export const getUserById = async (userId: number) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/find/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  const cookie = await getCookie("session");

  if (!cookie?.value) throw new Error("No session was found");

  try {
    const res = await fetch(`${serverUrl}/api/users`, {
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

export const updateUser = async (user: Partial<TUser>) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`${serverUrl}/api/users`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

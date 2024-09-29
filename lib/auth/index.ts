import { TCreateUserForm, TLoginForm } from "@/types/form.types";
import { removeCookie } from "./session";

export async function login(user: TLoginForm) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function signUp(data: TCreateUserForm) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function signOut() {
  await removeCookie("session");
  await removeCookie("refresh");
}

export async function deleteUser(userId: number) {
  const response = await fetch(`/api/auth/delete/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function refreshToken() {
  const response = await fetch(`/api/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });

  return response;
}
import { TCreateUserForm, TSignInUserForm } from "@/types/form.types";

export async function createUser(data: TCreateUserForm) {
  const response = await fetch("http://localhost:3456/user/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function login(user: TSignInUserForm) {
  const response = await fetch("http://localhost:3456/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

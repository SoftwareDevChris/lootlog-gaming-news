import { TCreateUserForm, TSignInUserForm } from "@/types/form.types";

export async function signUp(data: TCreateUserForm) {
  const response = await fetch("http://localhost:3456/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function signIn(user: TSignInUserForm) {
  const response = await fetch("http://localhost:3456/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function signOut() {
  const response = await fetch(`http://localhost:3456/api/auth/signout`);

  return response;
}

export async function deleteUser(userId: number) {
  const response = await fetch(
    `http://localhost:3456/api/auth/delete/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export async function getCurrentUser() {
  const response = await fetch(`http://localhost:3456/api/auth/profile`, {
    method: "GET",
    credentials: "include",
  });

  return response;
}

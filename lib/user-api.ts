import { TCreateUserForm, TSignInUserForm } from "@/types/form.types";

export async function signUp(data: TCreateUserForm) {
  const response = await fetch("http://localhost:3456/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const cookie = response.headers.getSetCookie();
    console.log(cookie);
  }

  return response;
}

export async function signIn(user: TSignInUserForm) {
  const response = await fetch("http://localhost:3456/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (response.ok) {
    // set access_token as cookie
    const fromJson = await response.json();
    const cookieFromBackend = fromJson.access_token;
  }

  return response;
}

export async function signOut() {
  const response = await fetch(`http://localhost:3456/auth/signout`);

  if (response.ok) {
    const cookie = response.headers.getSetCookie();
    console.log(cookie);
  }

  return response;
}

export async function deleteUser(userId: number) {
  const response = await fetch(`http://localhost:3456/auth/delete/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const asJson = await response.json();
    console.log(response);
    console.log(asJson);
  }

  return response;
}

export async function getCurrentUser() {
  const response = await fetch(`http://localhost:3456/auth/whoami`);

  if (response.ok) {
    const asJson = await response.json();
    console.log(response);
    console.log(asJson);
  }

  return response;
}

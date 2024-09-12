import { TCreateUserForm, TSignInUserForm } from "@/types/form.types";
import { removeCookie, setUserCookie } from "./cookies";
import { TUser } from "@/types/user.types";

export async function signUp(data: TCreateUserForm) {
  const response = await fetch("http://localhost:3456/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const asJson = await response.json();
  console.log(response);
  console.log(asJson);

  return response;
}

export async function signIn(user: TSignInUserForm) {
  const response = await fetch("http://localhost:3456/auth/signIn", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const responseBody = (await response.json()) as TUser;
    await setUserCookie(responseBody);
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

  return response;
}

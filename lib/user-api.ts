import { TCreateUserForm, TSignInUserForm } from "@/types/form.types";
import { removeCookie, setUserCookie } from "./cookies";
import { TUser } from "@/types/user.types";

export async function createUser(data: TCreateUserForm) {
  const user = {
    ...data,
    firstName: data.firstName.toLowerCase(),
    lastName: data.lastName.toLowerCase(),
    email: data.email.toLowerCase(),
  };

  const response = await fetch("http://localhost:3456/user/create", {
    method: "POST",
    body: JSON.stringify(user),
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

  if (response.ok) {
    const responseBody = (await response.json()) as TUser;
    await setUserCookie(responseBody);
  }

  return response;
}

export async function deleteUser(userId: number) {
  const response = await fetch(`http://localhost:3456/user/delete/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await removeCookie("session");
  }

  return response;
}

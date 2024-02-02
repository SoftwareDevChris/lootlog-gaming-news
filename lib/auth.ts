import { TUser } from "@/types/types";

export async function deleteUser(userId: string) {
  const response = await fetch("/api/delete-user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  return response;
}

export async function createUser(user: TUser) {
  const response = await fetch("/api/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
}

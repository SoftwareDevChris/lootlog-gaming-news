import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function deleteUser(userId: string) {
  const del = await fetch("/api/delete-user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  console.log(del);
  return del;
}

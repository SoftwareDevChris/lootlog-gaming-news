import { clerkClient } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  if (request.method !== "DELETE") {
    return Response.json("Method not allowed", { status: 405 });
  }

  const body = await request.json();

  const deleteUser = clerkClient.users.deleteUser(body.userId);

  console.log(deleteUser);

  return Response.json(deleteUser, { status: 200 });
}

import { clerkClient } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

type RequestBody = {
  userId: string;
};

const RequestBody = z.object({
  userId: z.string(),
});

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  // Delte the user from Clerk

  console.log({ body });

  return Response.json({ body });
}

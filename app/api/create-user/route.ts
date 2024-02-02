import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return Response.json("Method not allowed", { status: 405 });
  }

  const body = await request.json();

  const create = await db.user.create({
    data: {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    },
  });

  console.log(create);

  return Response.json(create, { status: 200 });
}

import { NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export default async function middleware(request: NextRequest) {
  return await updateSession(request);
}

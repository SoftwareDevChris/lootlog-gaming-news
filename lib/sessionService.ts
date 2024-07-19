"use server";

import { TAuthCookie } from "@/types/types";
// import { SignJWT, jwtVerify } from "jose";
import * as jose from "jose";

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function encrypt(payload: any) {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}

export async function decrypt(jwt: string): Promise<any> {
  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  });

  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) return null;
  return (await decrypt(session)) as TAuthCookie;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}

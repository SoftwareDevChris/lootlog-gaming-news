"use server";

import { TUser } from "@/types/user.types";
import { cookies } from "next/headers";
import { encrypt } from "./session";

export async function setCookieAsync(
  name: string,
  value: any,
  expires: number | Date
) {
  cookies().set({
    name,
    value,
    expires,
    httpOnly: true,
  });
}

export async function setUserCookie(user: TUser) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  const encryptedUserObject = await encrypt({
    user,
    expires,
  });

  await setCookieAsync("session", encryptedUserObject, expires);
}

export async function removeCookie(name: string) {
  cookies().set(name, "", {
    expires: new Date(0),
  });
}

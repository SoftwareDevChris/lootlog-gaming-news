"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: any) {
  cookies().set(name, value);
}

export async function getCookie(name: string) {
  cookies().get(name);
}

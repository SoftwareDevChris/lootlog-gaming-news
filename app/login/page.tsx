"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

// Clerk Auth
import { useSignIn } from "@clerk/nextjs";

// Context
import { AuthContext } from "@/context/auth";

// Queries
import { findOrCreateUser } from "@/lib/queries";

// Types
import { TUser } from "@/types/types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log("Login successful");

        const query: TUser = await findOrCreateUser({
          email,
          firstName: result.userData.firstName,
          lastName: result.userData.lastName,
          image_url: result.userData.imageUrl,
        });

        if (!query) {
          console.log("DB query failed:", query);
          return;
        } else {
          authContext.setUser(query);
          await setActive({ session: result.createdSessionId });
          router.push("/");
        }
      } else {
        console.log("Login failed:", result);
      }
    } catch (error) {
      console.log("Login catch error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-900 px-4 py-8 sm:py-40">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-neutral-900">
          Login
        </h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-neutral-900">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-neutral-900">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <button
            type="submit"
            className="hover:bg-custom-amber-700 mt-4 w-full rounded bg-custom-amber-800 p-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

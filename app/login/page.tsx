"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// React Hook Form
import { set, useForm } from "react-hook-form";

// Clerk Auth
import { useSignIn } from "@clerk/nextjs";

// Zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Context
import { AuthContext } from "@/context/auth";

// Types
import { TUser } from "@/types/types";
import { LoadingSpinner } from "@/components/ui/loading";

// Login Form Schema
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
});

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();
  const authContext = useContext(AuthContext);

  // Signup Form
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof loginFormSchema>) => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log("Login successful");

        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setErrorMessage("An unknown error occurred. Please try again");
        console.log("Login failed:", result);
      }
    } catch (err: any) {
      setErrorMessage(err.errors[0]?.longMessage ?? "An error occurred");
      console.error("error", err.errors[0]?.longMessage ?? "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 md:py-40">
      <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-md bg-neutral-100 p-8">
        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-bold capitalize text-neutral-900">
          Sign in
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-8 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {/* Sign Up Form */}
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmitHandler)}
            className="space-y-4"
          >
            {/* Email */}
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-custom-amber-800 py-2 capitalize text-white hover:bg-amber-800"
            >
              {isLoading ? <LoadingSpinner theme="orange" /> : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

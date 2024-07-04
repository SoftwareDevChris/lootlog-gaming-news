"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Clerk Auth
import { useSignUp } from "@clerk/nextjs";

// Zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import { useForm } from "react-hook-form";

// Helper functions
import { createUser } from "@/lib/auth";
import { LoadingSpinner } from "@/components/ui/loading";

// Toast
import toast from "react-hot-toast";

// Signup Schema Form
const registerFormSchema = z.object({
  firstName: z.string().min(2, { message: "Firstname is too short" }),
  lastName: z.string().min(2, { message: "Lastname is too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
  repeatPassword: z.string().min(8, { message: "Password is too short" }),
});

// Verification Schema Form
const verificationFormSchema = z.object({
  verificationCode: z.string().max(6, { message: "Code is too long" }),
});

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  // Signup Form
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  // Verification Form
  const verificationForm = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmitHandler = async (
    values: z.infer<typeof registerFormSchema>,
  ) => {
    // Is Clerk loaded
    if (!isLoaded) return;

    setErrorMessage("");
    setIsLoading(true);

    if (values.password !== values.repeatPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Change UI to the pending section
      setPendingVerification(true);
    } catch (err: any) {
      setErrorMessage(
        err.errors[0]
          ? err.errors[0].longMessage
          : "Signup failed. Please try again later.",
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyHandler = async (
    verify: z.infer<typeof verificationFormSchema>,
  ) => {
    if (!isLoaded) return;
    setErrorMessage("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verify.verificationCode,
      });

      // Check the verification status
      if (completeSignUp.status !== "complete") {
        console.log(
          "Verification failed:",
          JSON.stringify(completeSignUp, null, 2),
        );
        setErrorMessage("Verification failed");
        setIsLoading(false);
        return;
      }

      if (completeSignUp.status === "complete") {
        console.log("Verification complete");

        // If no user ID was created despite the verification being complete
        if (!completeSignUp.createdUserId) {
          setErrorMessage("Verification failed: Could not create user");
          setIsLoading(false);
          return;
        }

        // Create user in the database
        const createNewUser = await createUser({
          clerkId: completeSignUp.createdUserId,
          email: registerForm.getValues("email"),
          firstName: registerForm.getValues("firstName"),
          lastName: registerForm.getValues("lastName"),
        });

        if (createNewUser.status !== 201) {
          setErrorMessage("Failed to create user");
          setIsLoading(false);
          return;
        } else {
          await setActive({ session: completeSignUp.createdSessionId });
          toast.success("Account created successfully.");
          router.push("/");
        }
      }
    } catch (err: any) {
      setErrorMessage("Verification failed. Please try again later.");
      console.error(JSON.stringify(err, null, 2));
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="px-4 py-8 md:py-40">
      <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-md bg-neutral-100 p-8">
        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-bold text-neutral-900">
          Register
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-8 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {/* Sign Up Form */}
        <div className={pendingVerification ? "hidden" : ""}>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmitHandler)}
              className="space-y-4"
            >
              {/* Firstname */}
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lastname */}
              <FormField
                control={registerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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

              {/* Repeat Password */}
              <FormField
                control={registerForm.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="repeatPassword">
                      Repeat Password
                    </FormLabel>
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
                {isLoading ? (
                  <LoadingSpinner theme="orange" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Verification Form */}
        <div className={pendingVerification ? "" : "hidden"}>
          <Form {...verificationForm}>
            <form
              onSubmit={verificationForm.handleSubmit(onVerifyHandler)}
              className="space-y-4"
            >
              {/* Verification Code */}
              <FormItem>
                <FormLabel htmlFor="verificationCode">
                  Verification Code
                </FormLabel>
                <FormControl>
                  <FormField
                    control={verificationForm.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          We&apos;ve sent the code to your email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded bg-custom-amber-800 py-2 capitalize text-white hover:bg-amber-800"
              >
                {isLoading ? (
                  <LoadingSpinner theme="orange" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

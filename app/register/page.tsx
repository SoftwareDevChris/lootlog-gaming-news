"use client";

import { useState } from "react";
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
import { useAuth, useSignUp } from "@clerk/nextjs";

// Zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import { useForm } from "react-hook-form";
import { createUser } from "@/lib/queries";
import { deleteUser } from "@/lib/auth";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const { userId } = useAuth();
  console.log("User ID:", userId);

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
    if (!isLoaded) return;
    setErrorMessage("");

    if (values.password !== values.repeatPassword) {
      setErrorMessage("Passwords do not match");
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
      setErrorMessage(err.errors[0].longMessage ?? "Signup failed");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyHandler = async (
    verify: z.infer<typeof verificationFormSchema>,
  ) => {
    if (!isLoaded) return;
    setErrorMessage("");

    const formValues = registerForm.getValues();
    console.log("Formvalues:", formValues);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verify.verificationCode,
      });

      console.log("Complete signup:", completeSignUp.status);

      if (completeSignUp.status !== "complete") {
        console.log(
          "Verification failed:",
          JSON.stringify(completeSignUp, null, 2),
        );
        setErrorMessage("Verification failed");
        return;
      }

      if (completeSignUp.status === "complete") {
        await createUser({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
        });

        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setErrorMessage(err.errors[0]?.longMessage ?? "Verification failed");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const deleteUserHandler = async () => {
    if (!userId) return;

    const status = await deleteUser(userId);
    return status;
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
                className="w-full rounded bg-custom-amber-800 py-2 text-white hover:bg-amber-800"
              >
                Submit
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
                className="w-full rounded bg-custom-amber-800 py-2 text-white hover:bg-amber-800"
              >
                Verify
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Button onClick={deleteUserHandler}>Delete User</Button>
    </div>
  );
};

export default Register;

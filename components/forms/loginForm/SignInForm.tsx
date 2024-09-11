"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import { login } from "@/lib/user-api";
import { TSignInUserForm } from "@/types/form.types";

import toast from "react-hot-toast";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label/Label";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/FormSubmitButton";
import { TUser } from "@/types/user.types";

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInUserForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TSignInUserForm> = async (data) => {
    const res = await login(data);

    if (res.ok) {
      toast.success("You are now logged in", {
        position: "bottom-right",
      });
      router.push("/");
      return;
    }

    const jsonResponse = await res.json();
    setErrorMessage(jsonResponse.message);
    return;
  };

  return (
    <div className="auth-page">
      <div className="form-wrapper auth-form">
        <div className="title-container">
          <h2>Sign in</h2>
        </div>

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} required />}
            />
            {errors.email?.message && (
              <p className="input-error">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input {...field} type="password" required />
              )}
            />
            {errors.password?.message && (
              <p className="input-error">{errors.password.message}</p>
            )}
          </div>

          <FormSubmitButton title="Sign in" disabled={isSubmitting} />
        </form>

        <div className="link-container">
          <p style={{ marginBottom: "1rem" }}>Forgot password?</p>
          <p>Do you not have an account yet?</p>
          <Link href="/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

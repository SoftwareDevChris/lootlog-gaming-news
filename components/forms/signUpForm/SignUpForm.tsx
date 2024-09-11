"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import { createUser } from "@/lib/user-api";
import { TCreateUserForm } from "@/types/form.types";

import toast from "react-hot-toast";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label/Label";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/FormSubmitButton";

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCreateUserForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TCreateUserForm> = async (data) => {
    setErrorMessage([]);

    const res = await createUser(data);

    if (!res.ok) {
      const toJson = await res.json();
      setErrorMessage(toJson.message);
      return;
    }

    toast.success("Account created!\nYou can now log in", {
      position: "bottom-right",
    });
    router.push("/");
  };

  return (
    <div className="auth-page">
      <div className="form-wrapper auth-form">
        <div className="title-container">
          <h2>Sign up</h2>
        </div>

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ///////// */}
          {/* Firstname */}
          {/* ///////// */}
          <div className="input-group">
            <Label htmlFor="firstName">Firstname</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <input {...field} required />}
            />
            {errors.firstName?.message && (
              <p className="input-error">{errors.firstName.message}</p>
            )}
          </div>

          {/* //////// */}
          {/* Lastname */}
          {/* //////// */}
          <div className="input-group">
            <Label htmlFor="lastName">Lastname</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <input {...field} required />}
            />
            {errors.lastName?.message && (
              <p className="input-error">{errors.lastName.message}</p>
            )}
          </div>
          {/* ///// */}
          {/* Email */}
          {/* ///// */}
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

          {/* //////// */}
          {/* Password */}
          {/* //////// */}
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
          {/* /////////////// */}
          {/* Repeat Password */}
          {/* /////////////// */}
          <div className="input-group">
            <Label htmlFor="repeatedPassword">Repeat password</Label>
            <Controller
              name="repeatedPassword"
              control={control}
              render={({ field }) => (
                <input {...field} type="password" required />
              )}
            />
            {errors.repeatedPassword?.message && (
              <p className="input-error">{errors.repeatedPassword.message}</p>
            )}
          </div>
          {/* ////// */}
          {/* Submit */}
          {/* ////// */}
          <FormSubmitButton title="Create account" disabled={isSubmitting} />
        </form>

        <div className="link-container">
          <p>Do you already have an account?</p>
          <Link href="/sign-in">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

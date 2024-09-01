"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { signUp } from "@/lib/authService";

import toast from "react-hot-toast";

// Components
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/Label";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/FormSubmitButton";

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (data: FormData) => {
    const res = await signUp(data);

    if (res?.status === 201) {
      toast.success("Sign up success");
      redirect("/sign-in");
    } else {
      res?.message && setErrorMessage(res?.message);
      return;
    }
  };

  return (
    <div className="form-wrapper auth-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form action={handleSignUp}>
        {/* Firstname */}
        <div className="input-group">
          <Label htmlFor="firstName">Firstname</Label>
          <Input type="text" name="firstName" required />
        </div>

        {/* Lastname */}
        <div className="input-group">
          <Label htmlFor="lastName">Lastname</Label>
          <Input type="text" name="lastName" required />
        </div>

        {/* Email */}
        <div className="input-group">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" required />
        </div>

        {/* Password */}
        <div className="input-group">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" required />
        </div>

        {/* Repeat Password */}
        <div className="input-group">
          <Label htmlFor="repeatedPassword">Repeat password</Label>
          <Input type="password" name="repeatedPassword" required />
        </div>

        {/* Submit */}
        <FormSubmitButton title="Create account" />
      </form>
    </div>
  );
};

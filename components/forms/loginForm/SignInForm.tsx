"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/authService";

import toast from "react-hot-toast";

// Components
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { FormSubmitButton } from "@/components/buttons/FormSubmitButton/FormSubmitButton";

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (data: FormData) => {
    setErrorMessage("");

    const res = await signIn(data);

    if (res?.status === 200) {
      toast.success("Login success");
      redirect("/");
    } else {
      res?.message && setErrorMessage(res?.message);
      return;
    }
  };

  return (
    <div className="form-wrapper auth-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form action={handleSignIn}>
        {/* Email */}
        <div className="input-group">
          <Label htmlFor="email">Email address</Label>
          <Input name="email" type="email" required />
        </div>

        {/* Password */}
        <div className="input-group">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>

        <FormSubmitButton title="Sign in" />
      </form>
    </div>
  );
};

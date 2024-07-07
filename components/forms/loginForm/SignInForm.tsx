"use client";

import "./SignInForm.scss";

import { useState } from "react";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/authService";

import toast from "react-hot-toast";

// Components
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";

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
    <div className="auth-form-wrapper">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form action={handleSignIn}>
        {/* Email */}
        <div className="input-group">
          <Label htmlFor="enail">Email</Label>
          <Input name="email" type="email" />
        </div>

        {/* Password */}
        <div className="input-group">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" />
        </div>

        {/* Submit */}
        <Button type="submit" className="button btn-primary">
          <span>Sign in</span>
        </Button>
      </form>
    </div>
  );
};

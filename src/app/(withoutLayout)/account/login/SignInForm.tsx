"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { login } from "@/actions/auth";
import { setCredentials } from "@/redux/slice/authSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await login(formData).then(res => {
        if (res.success) {
        localStorage.setItem("token",res.data.token)
        const userInfo = {
          token: res.data.token,
          user: {
            ...res.data
          },
        };

        // Show success message
        toast.success("Logged in successfully!");
        dispatch(setCredentials(userInfo));
          router.push("/");
      } else {
        toast.error(res.message || "Invalid credentials!");
      }
      });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleLogin}>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <Link href="/forgot-password" className="text-black hover:underline">
          Forgot your password?
        </Link>
      </div>
      <Button className="bg-black hover:bg-black/90 w-full text-white">
        <span>Sign in</span>
      </Button>
      <div>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-black hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </form>
  );
}

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { TUserRegistration } from "@/types";
import { useSignUpUserMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TUserRegistration>();

  const registerUser: SubmitHandler<TUserRegistration> = async (data) => {
    const user = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      isAdmin: false,
    };

    try {
      const res = await signUpUser(user).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push("/account/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message??"Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit(registerUser)} className="space-y-3">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name">Full name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          placeholder="Full name"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="phone">Phone</label>
        <input
          {...register("phone", { required: true })}
          type="text"
          id="phone"
          placeholder="Enter your phone"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            {...register("password", { required: true })}
            type={showPass ? "text" : "password"}
            id="password"
            placeholder="Your password"
          />
          <span className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer">
            {showPass ? (
              <EyeSlashIcon
                className="size-6"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <EyeIcon className="size-6" onClick={() => setShowPass(true)} />
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="confirmPass">Confirm password</label>

        <input
          {...register("confirmPass", {
            validate: (value) =>
              value === watch("password") || "Confirm password doesn't match",
          })}
          type={showPass ? "text" : "password"}
          id="confirmPass"
          placeholder="Confirm password"
        />

        <p className="text-primary">
          {errors.confirmPass && <span>{errors.confirmPass.message}</span>}
        </p>
      </div>

      <Button className="bg-black hover:bg-black/90 w-full text-white">
        {isLoading ? "Please wait..." : "Register Account"}
      </Button>
      <div>
        Already have an account?{" "}
        <span>
          <Link href="/account/login" className="duration-300 hover:underline">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
}

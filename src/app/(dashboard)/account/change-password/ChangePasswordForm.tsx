"use client";

import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { config } from "@/config";
import { useAppSelector } from "@/redux/hooks";
import { selectedUserToken } from "@/redux/slice/authSlice";
import { TChangePassword } from "@/types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const token = useAppSelector(selectedUserToken);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TChangePassword>();

  const handleChangePassword: SubmitHandler<TChangePassword> = async (data) => {
    try {
      const response = await fetch(`${config.backend_url}/user/update/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        reset()
      } else {
        toast.error(responseData.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <ClientSecureWrapper>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="space-y-5 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg form"
      >
        {/* Old Password */}
        <div className="flex flex-col">
          <label htmlFor="oldPassword" className="text-sm font-semibold">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPass ? "text" : "password"}
              id="oldPassword"
              {...register("oldPassword", { required: "Old password is required" })}
              className="input-field"
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowOldPass(!showOldPass)}
            >
              {showOldPass ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </span>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="text-sm font-semibold">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type={showNewPass ? "text" : "password"}
              id="newPassword"
              className="input-field"
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              {showNewPass ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPass" className="text-sm font-semibold">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPass", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              type={showConfirmPass ? "text" : "password"}
              id="confirmPass"
              className="input-field"
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </span>
          </div>
          {errors.confirmPass && (
            <p className="text-red-500 text-sm">{errors.confirmPass.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full py-2 rounded-lg text-white font-semibold transition-colors duration-300"
        >
          Update Password
        </button>
      </form>
    </ClientSecureWrapper>
  );
}

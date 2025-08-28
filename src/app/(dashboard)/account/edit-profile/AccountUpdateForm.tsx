"use client";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { config } from "@/config";
import { useAppSelector } from "@/redux/hooks";
import {
  selectedUser,
  selectedUserToken,
  setCredentials,
} from "@/redux/slice/authSlice";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AccountUpdateForm() {
  const user = useAppSelector(selectedUser);
  const token = useAppSelector(selectedUserToken);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<any>();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState<any>({});

  // Fetch user data and update the form
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const response = await fetch(`${config.backend_url}/user/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        if (userData?.data) {
          setProfileInfo(userData.data);
          dispatch(
            setCredentials({ user: { ...user, ...userData.data }, token })
          );
          reset({
            name: userData.data.name,
            email: userData.data.email,
            phone: userData.data.phone,
          });
        }
      } catch (error) {
        toast.error("Failed to load account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, token, reset, updated]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle Account Update
  const updateAccount: SubmitHandler<any> = async (data) => {
    setLoading(true);
    try {
      let response;

      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);

        response = await fetch(`${config.backend_url}/user/update`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        response = await fetch(`${config.backend_url}/user/${user?.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const responseData = await response.json();

      if (response.ok) {
        toast.success(
          responseData.message || "Account details updated successfully."
        );

        // Update profile info and redux store if avatar is included
        if (responseData?.data) {
          setProfileInfo(responseData.data);
          setPhoto(null);
          setPhotoPreview(null);
          setUpdated(!updated);
        }
      } else {
        toast.error(
          responseData.message || "Failed to update account details."
        );
      }
    } catch (error) {
      toast.error("Something went wrong while updating account details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientSecureWrapper>
      <div className="max-w-5xl mx-auto mt-10 px-4 md:px-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* User Information Form */}
          <form
            onSubmit={handleSubmit(updateAccount)}
            className="space-y-6 bg-white shadow-lg rounded-lg p-6 border form"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Username is required" })}
                className="input-field"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-white py-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>

          {/* User Profile Photo Update */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border">
            <div className="relative mx-auto w-48 h-48 border-4 border-gray-200 rounded-full overflow-hidden shadow-md">
              <Image
                fill
                src={photoPreview || profileInfo?.avatar || "/img/head.png"}
                alt="profile-photo"
                className="object-cover"
              />
            </div>
            <form
              onSubmit={handleSubmit(updateAccount)}
              className="flex flex-col items-center mt-6 space-y-4 w-full"
            >
              <div className="w-full">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              <ArrowRightIcon width={24} className="text-gray-400" />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-white py-2 rounded-lg"
              >
                {loading ? "Submitting..." : "Submit Photo"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ClientSecureWrapper>
  );
}

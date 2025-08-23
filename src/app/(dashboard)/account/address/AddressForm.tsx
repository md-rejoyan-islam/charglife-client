"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { selectedUser, selectedUserToken } from "@/redux/slice/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { config } from "@/config";

// Define the shape of the shipping address
type TShippingAddress = {
  name: string;
  phone: string;
  address: string;
  country: string;
  email: string;
  town: string;
  zip: string;
};

export default function AddressForm() {
  const user = useAppSelector(selectedUser);
  const token = useAppSelector(selectedUserToken);
  const { register, handleSubmit, reset } = useForm<TShippingAddress>();
  const [loading, setLoading] = useState(false);

  // Fetch user data and update the shipping address form
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

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        if (userData?.data?.shippingAddress) {
          reset(userData?.data.shippingAddress); // Reset form with shipping address data
        }
      } catch (error) {
        toast.error("Failed to load shipping address.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, token, reset]);

  // Handle Shipping Address Update
  const updateShippingAddress: SubmitHandler<TShippingAddress> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backend_url}/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress: data }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || "Shipping address updated successfully.");
      } else {
        toast.error(responseData.message || "Failed to update shipping address.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the shipping address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientSecureWrapper>
      <form
        onSubmit={handleSubmit(updateShippingAddress)}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto form"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Your Shipping Address
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600 mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-600 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="town" className="text-sm font-medium text-gray-600 mb-2">
              Town
            </label>
            <input
              type="text"
              id="town"
              {...register("town", { required: "Town is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zip" className="text-sm font-medium text-gray-600 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              id="zip"
              {...register("zip", { required: "ZIP Code is required" })}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium text-gray-600 mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", { required: "Country is required" })}
              className="input-field"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Shipping Address"}
        </button>
      </form>
    </ClientSecureWrapper>
  );
}

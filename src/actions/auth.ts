"use server";

import { config } from "@/config";
import { TLoginResponse, TServerResponse } from "@/types";

import { cookies } from "next/headers";

export const login = async (formData: FormData) => {
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${config.backend_url}/user/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.ok && data.success) {
    // Store token in cookies for secure usage
    cookies().set("accessToken", data.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  }

  return data as TServerResponse<TLoginResponse>;
};

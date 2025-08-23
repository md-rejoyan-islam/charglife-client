import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Forgot Password | Charg Tech",
  description:
    "Reset your password to regain access to your account at Your Store Name. Enter your email to receive password reset instructions.",
};

export default function ForgotPassword() {
  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="p-8 bg-black/10 border-t-2 border-accent shadow-xl w-full max-w-xl rounded-md">
        <div className="mb-5">
          <Link href="/">
            <Image
              src="/img/black-n-red-logo.png"
              width={300}
              height={200}
              alt="logo"
              className="block mx-auto object-contain"
            />
          </Link>
        </div>
        <form action="" className="space-y-5">
          <div className="flex flex-col space-y-2">
            <label htmlFor="payload">Enter Email</label>
            <input
              type="text"
              placeholder="Search your account by email address"
              className="p-2 outline-none ring-1 rounded-md w-full"
            />
          </div>
          <Button className="bg-black hover:bg-black/90 text-white w-full">Search</Button>
        </form>
      </div>
    </section>
  );
}

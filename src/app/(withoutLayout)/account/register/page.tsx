import React from "react";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Charg Tech",
  description:
    "Create your account at Your Store Name to enjoy exclusive offers and a seamless shopping experience.",
};

export default function RegisterPage() {
  return (
    <section className="grid grid-cols-1 h-screen place-content-center justify-items-center px-4">
      <div className="bg-black/10 rounded-md border-t-2 border-accent w-full md:max-w-lg shadow-xl p-8">
        <div className="mb-3">
          <Link href="/">
            <Image
              src="/img/black-n-red-logo.png"
              width={250}
              height={150}
              alt="logo"
              className="block mx-auto object-contain"
            />
          </Link>
        </div>
        <div className="mb-3">
          <h3 className="text-center">Create an Account</h3>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignInForm from "./SignInForm";
import CredentialModal from "./CredentialModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Charg Tech",
  description:
    "Log in to your account at Your Store Name to access your order history, saved items, and more.",
};

export default function SignInPage() {
  return (
    <section className="grid grid-cols-1 h-screen place-content-center justify-items-center px-4">
      <div className="bg-black/10 relative rounded-md border-t-2 border-accent w-full md:max-w-lg shadow-xl p-8">
        {/* <CredentialModal /> */}
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

        <div className="mb-5">
          <h3 className="text-center">Login to your Account</h3>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}

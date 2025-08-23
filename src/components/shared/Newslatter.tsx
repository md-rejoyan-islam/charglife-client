"use client";

import type React from "react";

import { config } from "@/config";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Newslatter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${config.backend_url}/newslatter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setEmail("");
      toast.success("You will receive our latest offer news in your email");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full bg-[#ffdd00] py-6 md:py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-2">
            <Send className="h-6 w-6 font-light" />
            <span className="text-lg font-semibold">Sign up to Newsletter</span>
          </div>
          {/* <span className="font-bold">
            <span className="font-light">...and receive</span> Tk200 coupon for
            first shopping
          </span> */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-3 md:mt-0 flex w-full md:w-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="px-4 py-2 rounded-l-full w-full md:w-[300px] lg:w-[400px] focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#333] text-white px-6 py-2 rounded-r-full hover:bg-black transition-colors"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

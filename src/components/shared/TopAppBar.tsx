"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "../SearchBox";
import LatestOffer from "../LatestOffer";
import Login from "../navbar/Login";
import { removeExpiredItems } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(removeExpiredItems());
  }, [dispatch]);
  
  return (
    <nav className="button-color px-4 lg:px-0 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="flex items-center py-5 text-gray-700 hover:text-gray-900"
            >
              <Image
                width={150}
                height={100}
                alt="logo"
                src="/img/black-n-red-logo.png"
              />
            </Link>
          </div>

          <div className="flex px-4 py-1 mx-6 my-auto rounded-md w-full">
            <SearchBox />
          </div>

          <div className="flex flex-row justify-between items-center gap-5 w-fit">
            <div className="hidden w-full lg:inline-flex items-center justify-center">
              <LatestOffer />
            </div>

            <Login />

            <div className="hidden lg:inline-flex">
              <Link href="/contact">
                <div className="bg-[#100f11] text-white outline-none rounded-md px-6 py-3 cursor-pointer font-bold">
                  <button>Contact</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import { useAppSelector } from "@/redux/hooks";
import { selectedUserToken } from "@/redux/slice/authSlice";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { User } from "lucide-react";
import Link from "next/link";
import DashboardDropdown from "../shared/DashboardDropdown";

export default function Login() {
  const token = useAppSelector(selectedUserToken);

  return (
    <>
      {token ? (
        <DashboardDropdown />
      ) : (
        <div className="">
          <Menu>
            <MenuButton className="flex items-center">
              <User className="h-5 w-5 sm:h-7 sm:w-7 text-gray-700" />
            </MenuButton>

            <MenuItems transition anchor="bottom end" className="mt-4 z-50">
              <div className="relative">
                {/* top yellow strip */}
                <div className="absolute top-0 left-0 h-1 w-full bg-yellow-400 rounded-t-lg" />

                {/* card body */}
                <div className="w-72 rounded-lg bg-white shadow-lg pt-4 pb-6 px-6 text-center">
                  {/* Returning customer */}
                  <p className="text-sm font-medium text-[darkgray]">
                    Returning Customer&nbsp;?
                  </p>

                  {/* Sign‑in button */}
                  <Link
                    href={"/account/login"}
                    className="mt-3 inline-block rounded bg-yellow-400 px-5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-300 focus:outline-none"
                  >
                    Sign in
                  </Link>

                  {/* divider line */}
                  <div className="my-4 h-px w-full bg-[darkgray]" />

                  {/* Register prompt */}
                  <p className="text-sm text-[darkgray]">
                    Don&apos;t have an account&nbsp;?
                  </p>
                  <Link
                    href={"/account/register"}
                    className="mt-1 text-sm font-medium text-gray-800 hover:underline"
                  >
                    Register
                  </Link>
                </div>
              </div>
              {/* <div className="inline-flex items -center tex t-center gap-3">
          <User className="h-5 w-5 text-[darkgray]" />
          <div>
            <h3 className="text-[#100f11] font-bold">Accounts</h3>
            <div className="space-x-1 text-[11px] text-white/50 flex items-center">
              <Link
                href="/account/register"
                className="hover:!text-primary !duration-0 text-[#100f11]"
              >
                Register
              </Link>
              <span className="text-[#100f11]">or</span>
              <Link
                href="/account/login"
                className="hover:!text-primary !duration-0 text-[#100f11]"
              >
                Login
              </Link>
            </div>
          </div>
        </div> */}
            </MenuItems>
          </Menu>
        </div>
      )}
    </>
  );
}

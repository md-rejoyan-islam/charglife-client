import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/redux/hooks";
import { selectedUserToken } from "@/redux/slice/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import { usePathname } from "next/navigation";
import { userRoutes } from "@/utils/routes";

type FunctionReturn = {
  route: string;
  level: string;
};

export default function LeftSideBar({
  closeDrawer,
  open,
}: {
  closeDrawer: () => void;
  open: boolean;
}) {
  return (
    <aside className={`min-h-screen ${open ? "block z-50" : "hidden"}`}>
      <div
        className={`fixed top-0 left-0 lg:relative bg-gradient-to-b from-[#111827] via-[#1F2937] to-[#111827] text-white shadow-lg h-full w-[250px]`}
      >
        <LogoSection close={closeDrawer} />
        <ConditionalRoutes />
      </div>
    </aside>
  );
}

const LogoSection = ({ close }: { close: () => void }) => {
  return (
    <div className="h-[80px] border-b border-[#374151] p-0">
      <div className="h-full flex items-center justify-between px-4">
        <div className="w-fit mx-auto bg-white rounded-lg">
          <Link href="/">
            <Image
              src="/img/black-n-red-logo.png"
              alt="Logo"
              height={100}
              width={100}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>
        <div>
          <button
            onClick={close}
            className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#374151] rounded-full transition-all"
          >
            <ChevronLeftIcon width={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ConditionalRoutes = () => {
  const pathname = usePathname();
  const token = useAppSelector(selectedUserToken);
  const user: any = decodeToken(token as string);

  const checkRole = (): FunctionReturn[] => {
    return userRoutes;
  };

  const result = checkRole();

  return (
    <ul className="p-5 space-y-2">
      {result.map(({ level, route }) => (
        <Link href={route} key={level}>
          <li
            className={`flex items-center px-4 py-3 font-medium rounded-lg tracking-wide transition-all duration-300 ease-in-out 
              ${
                pathname === route
                  ? "bg-gradient-to-r from-[#3B82F6] via-[#9333EA] to-[#F43F5E] text-white shadow-lg"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#374151]"
              }`}
          >
            {level}
          </li>
        </Link>
      ))}
    </ul>
  );
};

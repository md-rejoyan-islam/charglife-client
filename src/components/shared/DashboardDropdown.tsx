"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectedUser } from "@/redux/slice/authSlice";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { dropdownUserRoutes } from "@/utils/routes";

export default function DashboardDropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectedUser);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  return (
    <div className="mt-2">
    <Menu as="div" className="relative inline-block text-left">
      {/* ── Avatar button ── */}
      <MenuButton className="size-8 rounded-full">
        <Image
          src={user?.avatar?user?.avatar: "/img/head.png"}
          width={38}
          height={38}
          className="h-8 w-8 rounded-full object-cover"
          alt="user avatar"
        />
      </MenuButton>

      {/* ── Dropdown ── */}
      <MenuItems
        anchor="bottom end"
        className="z-50 mt-3 min-w-72 origin-top-right rounded-lg bg-white text-black shadow-lg focus:outline-none"
      >
        {/* yellow strip */}
        <div className="h-1 w-full rounded-t-lg bg-yellow-400" />

        {/* body */}
        <div className="p-5">
          {/* nav links */}
          <RouteList role={user?.isAdmin ? "admin" : "user"} />

          {/* logout */}
          <div
            className="mt-5 w-full rounded bg-primary/70 px-4 py-2 font-medium text-white hover:bg-primary/90 hover:shadow cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </MenuItems>
    </Menu>
    </div>
  );
}

const RouteList = ({ role }: { role: string }) => {
  const checkRole = () => {
    dropdownUserRoutes;

    return dropdownUserRoutes;
  };

  const result = checkRole();

  return (
    <ul className="text-gray-800">
      {result.map((route) => (
        <Link href={route.route} key={route.route}>
          <li className="hover:bg-secondary p-2 rounded-md hover:text-white">
            {route.level}
          </li>
        </Link>
      ))}
    </ul>
  );
};

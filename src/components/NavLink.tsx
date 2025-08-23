// components/NavLink.tsx
import Link from "next/link";
import React, { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  currentPath: string; // New prop to receive current path from parent
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, currentPath }) => {
  const isActive = currentPath === href;

  return (
    <Link href={href}>
      <a className={isActive ? "active" : "default"}>{children}</a>
    </Link>
  );
};

export default NavLink;

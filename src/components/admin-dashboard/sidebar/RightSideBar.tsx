import React from "react";
import Nav from "../Nav";

type Props = {
  children: React.ReactNode;
  openDrawer: () => void;
  open: boolean;
};

export default function RightSideBar({ children, openDrawer, open }: Props) {
  return (
    <div className="w-full h-full">
      <Nav openDrawer={openDrawer} open={open} />
      <div className="p-6 h-full">{children}</div>
    </div>
  );
}

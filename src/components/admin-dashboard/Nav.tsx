import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DashboardDropdown from "../shared/DashboardDropdown";

type Props = {
  openDrawer: () => void;
  open: boolean;
};

export default function Nav({ openDrawer, open }: Props) {
  return (
    <div className="h-20 flex items-center justify-between px-5 py-2 bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] shadow-md">
      <div>
        {!open && (
          <button
            onClick={openDrawer}
            className="p-2 rounded-full bg-[#374151] hover:bg-[#3B82F6] transition-all duration-300"
          >
            <ChevronRightIcon width={20} color="#FFFFFF" />
          </button>
        )}
      </div>
      <DashboardDropdown />
    </div>
  );
}

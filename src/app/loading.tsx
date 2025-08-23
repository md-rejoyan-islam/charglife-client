import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-68px)]">
      <img src="/img/loader.gif" alt="loader" />
      {/* <p className="text-7xl font-thin">L</p>
      <div className="w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-primary"></div>
      <p className="text-7xl font-thin">ading...</p> */}
    </div>
  );
}

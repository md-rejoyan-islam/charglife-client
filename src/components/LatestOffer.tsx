import React from "react";
import Link from "next/link";
import { GiftOutlined } from "@ant-design/icons";

const LatestOffer = () => {
  return (
    <>
      <Link href="/campaign" className="inline-flex">
        <GiftOutlined className="!text-[1.4rem] text-[#100f11]" />
        <div className="ml-3 w-[5rem] text-left flex flex-col">
          <h3 className="text-[#100f11]">Campaign</h3>
          <span className="text-xs text-[#100f11] font-bold">Latest Campaigns</span>
        </div>
      </Link>
    </>
  );
};

export default LatestOffer;

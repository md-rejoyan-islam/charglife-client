import OfferViewContainer from "@/container/OfferContainer/SubComponent/OfferViewContainer";
import React, { Suspense } from "react";


export const metadata = {
  title: "Products | Charg Tech",
  description:
    "Buy the latest products at the best price from Charg Tech. Features, specifications, and customer reviews.",
};

export default function OfferPage() {

  return    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="text-lg font-semibold text-gray-600">Loading...</span>
        </div>
      }><OfferViewContainer /></Suspense> ;
}

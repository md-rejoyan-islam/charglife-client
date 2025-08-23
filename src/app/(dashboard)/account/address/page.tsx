import React from "react";
import AddressForm from "./AddressForm";

export default function AddressPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Note Section */}
      <div className="bg-secondary/70 p-4 rounded-lg text-accent border-l-4 border-accent mb-6 shadow-lg">
        <p className="font-semibold md:text-xl">Note</p>
        <p className="mt-2 text-sm">Please update your address information for products delivery.</p>
      </div>

      {/* Address Form Section */}
      <AddressForm />
    </div>
  );
}

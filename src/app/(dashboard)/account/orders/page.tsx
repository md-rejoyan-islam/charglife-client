import React from "react";
import UserOrderList from "./UserOrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History | Charg Tech",
  description:
    "View your past orders and track your recent purchases at Charg Tech.",
};
export default function OrderPage() {
  return <UserOrderList />;
}

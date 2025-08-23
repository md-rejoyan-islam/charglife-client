import React from "react";
import { Toaster } from "sonner";

export default function WithoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Toaster />
    </section>
  );
}

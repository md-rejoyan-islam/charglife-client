"use client";
import React from "react";
import SecurePage from "./SecurePage";


const ClientSecureWrapper = ({ children }: { children: React.ReactNode }) => {
  const WrappedComponent = SecurePage(() => <>{children}</>);
  return <WrappedComponent />;
};

export default ClientSecureWrapper;

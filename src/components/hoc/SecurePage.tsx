"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { selectedUser } from "@/redux/slice/authSlice";
import { useAppSelector } from "@/redux/hooks";

const SecurePage = (Component: React.ComponentType) => {
  const SecureComponent: FC = (props: any) => {
    const user = useAppSelector(selectedUser);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        // Redirect to login page if user is not present
        router.replace("/account/login");
      } else {
        setIsLoading(false);
      }
    }, [user, router]);

    if (isLoading) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      );
    }

    return <Component {...props} />;
  };

  return SecureComponent;
};

export default SecurePage;

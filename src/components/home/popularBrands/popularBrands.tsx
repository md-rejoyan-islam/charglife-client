"use client";
import React, { useState, useEffect } from "react";
import { InfiniteMovingCards } from "./infinite-moving-cards";
import { config } from "@/config";
import Loading from "@/app/loading";

export function PopularBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.backend_url}/brand`);
        const data = await response.json();
        
        setBrands(data?.data?.result || []); 
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <>
      <div className="text-center my-6 mb-6">
        <h2 className="text-2xl font-bold mb-1">Popular Brands</h2>
        <h2 className="font-medium">
          Get Your Desired Product from Featured Category!
        </h2>
      </div>

      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden pb-10">
        <InfiniteMovingCards items={brands} direction="left" speed="slow" />
      </div>
    </>
  );
}

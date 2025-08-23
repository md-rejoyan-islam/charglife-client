"use client"
import Loading from "@/app/loading";
import { config } from "@/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const FeaturedCategory = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter()

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${config.backend_url}/offer`);
        const data = await response.json();
        setFeatures(data.data.result || []); // Adjust the key based on your API response structure
      } catch (error) {
        console.error("Failed to fetch offer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features?.map((feature:any) => (
          <div
            onClick={()=>router.push(`/${feature?.product?.productName?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`)}
            key={feature._id}
            className="hover:border-red-200 border-2 rounded-xl cursor-pointer"
          >
            <div className="relative flex h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <Image
                className="object-cover object-center h-[162px] w-full"
                height={162}
                width={395}
                src={feature.image}
                alt={feature.title}
              />
              <div className="absolute inset-0 flex flex-col p-6">
                <div className="my-auto">
                  <h2 className="tracking-widest text-lg title-font font-bold text-gray-400 mb-1 text-primary">
                    {`${feature.discount} ${feature.discountType=="percentage"?"%":"Tk"} OFFF`}
                  </h2>
                  <h1 className="title-font text-2xl font-extrabold">
                    {feature.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;

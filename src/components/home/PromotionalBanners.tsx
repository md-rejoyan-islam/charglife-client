"use client"

import Link from "next/link"
import { ArrowRight, Slice } from "lucide-react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/config";

export default function PromotionalBanners() {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const router=useRouter()
  
    useEffect(() => {
      const fetchOffers = async () => {
        try {
          const response = await fetch(`${config.backend_url}/offer`);
          const data = await response.json();
          setFeatures(data.data.result.slice(0,2) || []); // Adjust the key based on your API response structure
        } catch (error) {
          console.error("Failed to fetch offer data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOffers();
    }, []);
  return (
    <div className="container mx-auto pt-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {
                  features?.map((feature: any) => 
                    <div key={feature?._id} className="bg-[#f6f6f6] rounded-lg overflow-hidden p-6 flex items-center">
                  <div className="w-1/2">
                    <img   src={feature.image} alt="Camera" className="object-contain h-48 w-full" />
                  </div>
                          <div className="w-1/2 pl-4">
                          <h6 className="title-font text-2xl font-extrabold">
                    {feature.title}
                  </h6>
                              <p className="text-gray-600 text-sm md:text-base"> {feature.description}</p>
                              <h2 className="tracking-widest text-lg title-font font-bold text-gray-400 mb-1 text-primary">
                    {`${feature.discount} ${feature.discountType=="percentage"?"%":"Tk"} OFF`}
                  </h2>
                    <Link
                      href={`/${feature?.product?.productName?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`}
                      className="inline-flex items-center mt-4 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Shop now
                      <span className="ml-1 bg-yellow-400 rounded-full p-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
                )
              }

  

      </div>
    </div>
  )
}

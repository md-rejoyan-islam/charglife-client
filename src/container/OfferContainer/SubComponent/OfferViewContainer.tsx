"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { config } from "@/config";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Loading from "@/app/loading";

const OfferViewContainer = () => {
  const { id } = useParams();
  const [sale, setSale] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`${config.backend_url}/campaign/${id}`);
        const data = await response.json();
        setSale(data?.data); // Adjust this based on the actual key for the sale data
      } catch (error) {
        console.error("Failed to fetch sale details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetails();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (!sale) {
    return <div className="text-center py-8">No sale details available.</div>;
  }

  const {
    _id,
    name,
    code,
    image,
    startDate,
    endDate,
    description,
    discountType,
    discountValue,
    minimumOrderValue,
    maximumDiscount,
    applicableProducts,
  } = sale;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 lg:px-0">
{/* Sale Details */}
<div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="relative w-full h-72">
    <Image
      src={image}
      alt={name}
      layout="fill"
      objectFit="cover"
      className="rounded-t-lg"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
        {name}
      </h1>
    </div>
  </div>
  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong className="text-primary">Start Date:</strong> {new Date(startDate).toLocaleString("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Dhaka",
})}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong className="text-primary">End Date:</strong> {new Date(endDate).toLocaleString("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Dhaka",
})}
        </p>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong className="text-primary">Discount:</strong> {discountValue}{    discountType === "percentage"?"%":"Tk"} ({discountType})
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong className="text-primary">Minimum Order Value:</strong> TK{minimumOrderValue}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong className="text-primary">Maximum Discount:</strong> TK{maximumDiscount}
        </p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mt-4">{description}</p>
  </div>
</div>


      {/* Applicable Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Applicable Products</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {applicableProducts?.map((product:any) => (
          <ProductCard product={product} key={product._id} offer={_id}  disabled={new Date(startDate) > new Date()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferViewContainer;

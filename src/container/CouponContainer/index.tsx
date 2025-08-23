"use client";

import React, { useEffect, useState } from "react";
import { config } from "@/config";
import Image from "next/image";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import Loading from "@/app/loading";

interface Coupon {
  _id: string;
  name: string;
  code: string;
  image: string;
  endDate: string;
  description: string;
  discountType: 'percentage' | 'value';
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscount?: number;
  status: boolean;
}

export default function CouponContainer() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const couponResponse = await fetch(`${config.backend_url}/coupon`);
        const couponData = await couponResponse.json();
        setCoupons(couponData?.data?.result || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Coupon code copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy coupon code');
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center space-y-2 mb-10">
        <h2 className="font-bold text-3xl text-gray-800">Available Coupons</h2>
        <p className="font-medium text-gray-600">Use these coupons to get amazing discounts!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-4 bg-primary rounded-l-lg"></div>
            <div className="absolute top-0 bottom-0 right-0 w-4 bg-primary rounded-r-lg"></div>
            <div className="px-6 py-4 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{coupon.name}</h3>
                {coupon.image && (
                  <Image src={coupon.image} alt={coupon.name} width={40} height={40} className="rounded-full" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{coupon.description}</p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4 flex justify-between items-center">
                <span className="font-mono text-lg font-bold text-primary">{coupon.code}</span>
                <button 
                  onClick={() => copyToClipboard(coupon.code)}
                  className="bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-dark transition duration-300 flex items-center"
                >
                  <CopyOutlined className="mr-1" /> Copy
                </button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>Discount: <span className="font-semibold">{coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : ' BDT'} off</span></p>
                {coupon.minimumOrderValue && <p>Min. Order: <span className="font-semibold">{coupon.minimumOrderValue} BDT</span></p>}
                {coupon.maximumDiscount && <p>Max. Discount: <span className="font-semibold">{coupon.maximumDiscount} BDT</span></p>}
                <p>Valid until: <span className="font-semibold">{new Date(coupon.endDate).toLocaleDateString()}</span></p>
              </div>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-100 rounded-r-full"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-100 rounded-l-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
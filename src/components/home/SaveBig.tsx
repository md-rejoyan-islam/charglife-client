"use client";

import { config } from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard";

export default function SaveBig() {
  const [campaign, setCampaign] = useState<any>([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `${config.backend_url}/item/search?tags=Save Big`
        );
        const data = await response.json();

        setCampaign(data?.data?.result || {});
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      }
    };

    fetchCampaign();
  }, []);
  return (
    <main className="container mx-auto py-8">
      {/* Trending Products Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 relative">
          <h2 className="text-xl md:text-2xl relative inline-block">
            Save Big on Warehouse Cleaning
            <span className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-yellow-400"></span>
          </h2>
          <Link
            href="/product"
            className="text-[darkgray] text-xs md:text-md hover:text-gray-900 flex items-center"
          >
            Go to Daily Deals Section
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="bg-gray-100 py-1 rounded-lg text-center text-gray-500">
          <div className="relative">
            <Swiper
              modules={[Keyboard, Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {campaign?.map((product: any) => (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} key={product._id} />
                </SwiperSlide>
              ))}
              <div className="absolute inset-0 flex justify-between items-center">
                <div className="swiper-button-prev  py-10" />
                <div className="swiper-button-next  py-10" />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
}

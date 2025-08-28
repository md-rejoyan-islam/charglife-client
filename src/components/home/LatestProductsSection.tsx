"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

// Import Swiper styles
import { config } from "@/config";
import "swiper/css";
import "swiper/css/navigation";
import WeekDealSwiperSlide from "./WeekDealSwiperSlide";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-[darkgray]"
          }`}
        />
      ))}
    </div>
  );
};

export default function LatestProductsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any | null>(null);
  const [campaign, setCampaign] = useState<any>([]);

  console.log(campaign);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `${config.backend_url}/item/search?tags=Latest Product`
        );
        const data = await response.json();

        setCampaign(data?.data?.result.slice(0, 4) || {});
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      }
    };

    fetchCampaign();
  }, []);

  const [weekDeal, setWeekDeal] = useState<any>({ applicableProducts: [] });

  useEffect(() => {
    const setWeekDeals = async () => {
      try {
        const response = await fetch(
          `${config.backend_url}/campaign?name=Deals of the week`
        );
        const data = await response.json();

        setWeekDeal(data?.data?.result[0] || {});
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      }
    };

    setWeekDeals();
  }, []);
  return (
    <div className="container mx-auto pt-3 pb-8 sm:py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Latest Products Section */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4 md:pb-2 border-b border-gray-200 relative">
            <h2 className="px-2 py-1 bg-yellow-400 w-full md:px-0 md:py-0 md:bg-transparent  text-xl md:text-2xl relative inline-block">
              Latest Products
              <span className="md:block hidden absolute bottom-[-10px] left-0 w-full h-[2px] bg-yellow-400"></span>
            </h2>
          </div>

          <div className="mt-6 space-y-6">
            {campaign?.map((product: any) => (
              <div
                key={product.id}
                className="flex group/image items-center gap-4"
              >
                <div className="relative h-20 w-20 flex-shrink-0  overflow-hidden">
                  {/* First image (visible by default) */}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.productName}
                    width={80}
                    height={80}
                    className="absolute rounded-sm h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover/image:-translate-x-full"
                  />

                  {/* Second image (hidden by default) */}
                  <Image
                    src={product.productImage[0] || "/placeholder.svg"}
                    alt={product.productName}
                    width={80}
                    height={80}
                    className="absolute h-full w-full object-contain transition-transform duration-500 ease-in-out translate-x-full group-hover/image:translate-x-0"
                  />
                </div>

                <div className="flex-1">
                  <Link
                    href={`/${product?.productName
                      ?.replace(/\s+/g, "-")
                      ?.toLowerCase()}`}
                    className="text-sm font-medium text-[gray] hover:text-yellow-500"
                  >
                    {product.productName}
                  </Link>
                  <div className="mt-1">
                    <StarRating rating={product.ratings} />
                  </div>
                  <div className="mt-1 font-bold text-gray-800">
                    ৳{product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 mt-8">
          <h2 className="text-2xl font-medium text-gray-800">
            Deals of the week
          </h2>
          <div className="mt-8">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              className="deals-swiper"
            >
              {weekDeal?.applicableProducts?.map((deal: any, index: number) => (
                <WeekDealSwiperSlide
                  deal={deal}
                  weekDeal={weekDeal}
                  swiperRef={swiperRef}
                />
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

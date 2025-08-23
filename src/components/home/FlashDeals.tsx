"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import StarRatings from "react-star-ratings";

import { THotOfferResponse } from "@/types";
import { calculateTimeLeft } from "@/assets/helper";
import { config } from "@/config";
import Loading from "@/app/loading";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const StarRatingsComponent = StarRatings as unknown as React.FC<any>;


export default function FlashDeals() {
    const [campaign, setCampaign] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 10,
    hours: 11,
    minutes: 55,
    seconds: 40,
  });

  useEffect(() => {
    const flashDeal = async () => {
      try {
        const response = await fetch(`${config.backend_url}/campaign?name=flash deal`);
        const data = await response.json();
  
        setCampaign(data?.data?.result[0] || {});
  
        if (data?.data?.result[0]) {
          const startDate = new Date(data?.data?.result[0]?.startDate);
          const endDate = new Date(data?.data?.result[0]?.endDate);
  
          const updateCountdown = () => {
            setTimeLeft(calculateTimeLeft(startDate, endDate));
          };
  
          // Update countdown immediately and start interval
          updateCountdown();
          const timer = setInterval(updateCountdown, 1000);
  
          // Cleanup interval on component unmount
          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    flashDeal();
  }, []);
  
    if (loading) {
      return <Loading/>;
    }
  
    if (!campaign) {
      return <div ></div>;
  }
  
  const options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: {
      delay: 3000,
    },
  };






  return (
    <section className="container mx-auto pt-8">
    <div className="text-center mb-6">
    <h2 className="font-bold text-2xl">🔥 Flash Deal</h2>
      <p className="text-gray-600">Grab these deals before time runs out!</p>
    </div>
    <Swiper
      modules={[Keyboard, Navigation, Autoplay]}
      loop={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        375: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 1, spaceBetween: 20 },
        1124: { slidesPerView: 1, spaceBetween: 30 },
        1240: { slidesPerView: 2, spaceBetween: 30 },
      }}
    >
      {campaign?.applicableProducts?.map((product: any, index: number) => (
        <SwiperSlide key={index}>
      <Link
  href={`/${product.productName.replace(/\s+/g, "-")}`}
  className="flex flex-col sm:flex-row bg-white p-4 gap-4 rounded-lg shadow-lg border border-gray-200 
  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border-primary"
>
            {/* Image Section */}
            <div className="relative flex-shrink-0 w-full sm:w-[250px]">
              <Image
                src={product.image}
                alt={product.productName}
                width={250}
                height={250}
                className="rounded-xl object-cover w-full h-auto sm:max-h-[250px]"
              />
              <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-xl">
                {product.discount}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full text-center sm:text-left">
              <span className="text-gray-500 text-sm capitalize">{product?.brand?.name}</span>
              <h3 className="font-semibold text-lg text-gray-800">{product.productName}</h3>

              {/* Rating Section */}
              <div className="flex justify-center sm:justify-start mt-1">
                <StarRatingsComponent
                  numberOfStars={5}
                  rating={product?.ratings || 0}
                  starSpacing="1px"
                  starRatedColor="orange"
                  starDimension="18px"
                />
              </div>

              {/* Price Section */}
              <div className="mt-2 flex items-center justify-center sm:justify-start">
                <span className="text-gray-500 line-through text-sm mr-2">৳{product?.displayPrice}.00</span>
                <span className="text-primary font-bold text-lg">৳{product?.price}.00</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex gap-2 py-4 items-center justify-center sm:justify-start text-center">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hrs", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md shadow">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs mt-1 text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
  );
}

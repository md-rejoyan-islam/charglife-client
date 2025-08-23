"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";

import {
  RightOutlined,
} from "@ant-design/icons";
import { config } from "@/config";
import ProductCard from "../ProductCard";
import Loading from "@/app/loading";

export default function GadgetFest() {
    const [campaign, setCampaign] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`${config.backend_url}/campaign`);
        const data = await response.json();
        
        setCampaign(data?.data?.result[0] || {}); 
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, []);

  if (loading) {
    return <Loading/>;
  }
  if (!campaign) {
    return <div ></div>;
  }


  
  return (
    <section className="max-w-7xl mx-auto overflow-hidden py-8 px-4 lg:px-0">
      <div className="flex justify-between items-end">
        <div className="text-start space-y-1">
          <h2 className="font-bold text-2xl">{campaign?.name}</h2>
          <p className="font-medium">{campaign?.description}</p>
        </div>
        <Link
          href={`/campaign/${campaign?._id}`}
          className="hover:underline duration-300 text-primary font-semibold"
        >
          <>
            View all <RightOutlined style={{ fontSize: "12px" }} />
          </>
        </Link>
      </div>

      <div className="w-16 bg-primary mb-6"></div>
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
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {campaign?.applicableProducts?.map((product:any) => (
            <SwiperSlide key={product._id}>
            <ProductCard product={product} key={product._id} />
            </SwiperSlide>
          ))}
          <div className="absolute inset-0 flex justify-between items-center">
            <div className="swiper-button-prev bg-[#101010] hover:bg-[#251546] py-10" />
            <div className="swiper-button-next bg-[#101010] hover:bg-[#251546] py-10" />
          </div>
        </Swiper>
      </div>
    </section>
  );
}

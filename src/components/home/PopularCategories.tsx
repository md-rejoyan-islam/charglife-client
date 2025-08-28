"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { config } from "@/config";
import { RightOutlined } from "@ant-design/icons";
import ProductCard from "../ProductCard";

export default function PopularCategories() {
  const [campaign, setCampaign] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`${config.backend_url}/item`);
        const data = await response.json();

        setCampaign(data?.data?.result || {});
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, []);

  return (
    <section className="max-w-7xl mx-auto overflow-hidden py-8 px-4 lg:px-0">
      <div className="flex justify-between items-end">
        <div className="text-start space-y-1">
          <h2 className="font-bold text-2xl">Popular Category</h2>
          <p className="font-medium">Buy these products within time! </p>
        </div>
        <Link
          href="/product"
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
            },
          }}
        >
          {campaign?.map((product: any) => (
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

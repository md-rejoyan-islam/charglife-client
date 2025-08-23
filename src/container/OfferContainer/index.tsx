"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation"
import { config } from "@/config";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import {
  RightOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks";
import ProductCard from "@/components/ProductCard";
import Loading from "@/app/loading";
import CampaignBanner from "@/components/CampaignBanner";


export default function OfferContainer() {
 
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [campaigns, setCampaigns] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`${config.backend_url}/campaign`);
        const data = await response.json();
        
        setCampaigns(data?.data?.result || {}); 
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


  return (
    <section className="">
        <CampaignBanner/>
    <div className="container mx-auto">
      {
        campaigns?.map((campaign:any)=>    <section className="max-w-7xl mx-auto overflow-hidden py-8 px-4 lg:px-0">
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
             <ProductCard product={product} key={product._id} offer={campaign._id}  disabled={new Date(campaign.startDate) > new Date()} ></ProductCard>
                </SwiperSlide>
              ))}
              <div className="absolute inset-0 flex justify-between items-center">
                <div className="swiper-button-prev bg-[#101010] hover:bg-[#251546] py-10" />
                <div className="swiper-button-next bg-[#101010] hover:bg-[#251546] py-10" />
              </div>
            </Swiper>
          </div>
        </section>)
      }
 
    </div>
    </section>
  );
}
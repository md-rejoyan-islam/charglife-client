"use client";

import { config } from "@/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SmallPromotionalBanners() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${config.backend_url}/offer`);
        const data = await response.json();
        setFeatures(data.data.result.slice(0, 3) || []); // Adjust the key based on your API response structure
      } catch (error) {
        console.error("Failed to fetch offer data:", error);
      }
    };

    fetchOffers();
  }, []);
  return (
    <div className="container mx-auto pt-8">
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
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {features?.map((feature: any) => (
            <SwiperSlide key={feature._id}>
              <div className="bg-[#f6f6f6] rounded-lg overflow-hidden p-4 flex items-center">
                <div className="w-1/2">
                  <img
                    src={feature.image}
                    alt="Camera"
                    className="h-[130px] w-full"
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <h6 className="title-font text-lg font-extrabold">
                    {feature.title}
                  </h6>
                  <p className="text-gray-400 text-sm text-xs">
                    {" "}
                    {feature.description}
                  </p>
                  <h2 className="tracking-widest text-lg title-font font-bold text-gray-400 mb-1 text-primary">
                    {`${feature.discount}${
                      feature.discountType == "percentage" ? "%" : "Tk"
                    } OFF`}
                  </h2>
                  <Link
                    href={`/${feature?.product?.productName
                      ?.replace(/\s+/g, "-")
                      ?.toLocaleLowerCase()}`}
                    className="inline-flex items-center mt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Shop now
                    <span className="ml-1 bg-yellow-400 rounded-full p-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                  features?.map((feature: any) => 
                    <div key={feature?._id} className="bg-[#f6f6f6] rounded-lg overflow-hidden p-4 flex items-center">
                  <div className="w-1/2">
                    <img   src={feature.image} alt="Camera" className="h-[130px] w-full" />
                  </div>
                          <div className="w-1/2 pl-3">
                          <h6 className="title-font text-lg font-extrabold">
                    {feature.title}
                  </h6>
                              <p className="text-gray-400 text-sm text-xs"> {feature.description}</p>
                              <h2 className="tracking-widest text-lg title-font font-bold text-gray-400 mb-1 text-primary">
                    {`${feature.discount}${feature.discountType=="percentage"?"%":"Tk"} OFF`}
                  </h2>
                    <Link
                      href={`/${feature?.product?.productName?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`}
                      className="inline-flex items-center mt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
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

  

      </div> */}
    </div>
  );
}

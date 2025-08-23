"use client";

import { config } from "@/config";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Dynamically import the Loading component
const Loading = dynamic(() => import("@/app/loading"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
  ),
});

interface BannerData {
  _id: string;
  image: string;
  link: string;
  description: string;
  active: boolean;
  bannerType: string;
  createdAt: string;
  updatedAt: string;
}

export default function Banner() {
  const [bannersSlider, setBannersSlider] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${config.backend_url}/banner`);
        const data = await response.json();
        if (data.success) {
          const sliderBanners = data.data.result.filter(
            (res: BannerData) => res.bannerType === "slider"
          );
          const staticBanners = data.data.result.filter(
            (res: BannerData) => res.bannerType === "static"
          );

          setBannersSlider(sliderBanners);

          // Preload images
          sliderBanners
            .concat(staticBanners.slice(0, 2))
            .forEach((banner: any) => {
              const img = new Image();
              img.src = banner.image;
            });
        } else {
          setError(data.message || "Failed to fetch banners");
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching banners"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="">
      <div className=" w-full group relative">
        <Swiper
          rewind={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className=""
        >
          {bannersSlider.map((banner, index) => (
            <SwiperSlide key={banner._id}>
              <NextImage
                style={{ cursor: "pointer" }}
                onClick={() => router.push(banner?.link || "/campaign")}
                src={banner.image || "/img/White-n-red-logo.png"}
                alt={banner.description}
                height={200}
                width={2000}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                placeholder="blur"
                className="w-full h-full"
                blurDataURL="/img/White-n-red-logo.png"
              />
            </SwiperSlide>
          ))}
          {/* <div className="absolute inset-0 flex justify-between items-center">
              <div className="swiper-button-prev hidden lg:flex group-hover:flex bg-[#101010] hover:bg-[#251546] py-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <div className="swiper-button-next hidden lg:flex group-hover:flex bg-[#101010] hover:bg-[#251546] py-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div> */}
        </Swiper>
      </div>
    </section>
  );
}

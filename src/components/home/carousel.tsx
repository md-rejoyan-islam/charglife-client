"use client";

import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ICarousel {
  _id: string;
  image: string;
  link: string;
}

import { config } from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [carousels, setCarousels] = useState<ICarousel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.backend_url}/carousel`);
        const data = await response.json();
        if (data.success) {
          setCarousels(data.data);
        } else {
          setError(data.message || "Failed to fetch carousels");
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

    fetchCarousel();
  }, []);

  return (
    <section className="pt-2 sm:pt-12 container mx-auto">
      <div className=" w-full group relative">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // 640: {
            //   slidesPerView: 1,
            // },
            // 768: {
            //   slidesPerView: 2,
            //   spaceBetween: 10,
            // },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={4}
          pagination={{ clickable: true }}
          className=""
        >
          {carousels?.map((carousel) => (
            <SwiperSlide key={carousel._id}>
              <Link href={carousel?.link || "/"}>
                <Image
                  src={carousel.image}
                  alt={`Carousel Image ${carousel._id}`}
                  width={420}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;

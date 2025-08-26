"use client";

import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ICarousel {
  _id: string;
  image: string;
}

import image1 from "./images/Screenshot from 2025-08-26 10-25-04.webp";
import image2 from "./images/Screenshot from 2025-08-26 10-26-39.webp";

const Carousel = () => {
  const carousels = [
    { _id: "1", image: image1 },
    { _id: "2", image: image2 },
    { _id: "3", image: image1 },
    { _id: "4", image: image2 },
    { _id: "5", image: image1 },
  ];
  //   const [carousels, setCarousels] = useState<ICarousel[]>([]);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchCarousel = async () => {
  //       try {
  //         setLoading(true);
  //         const response = await fetch(`${config.backend_url}/carousel`);
  //         const data = await response.json();
  //         if (data.success) {
  //           setCarousels(data.data);
  //         } else {
  //           setError(data.message || "Failed to fetch carousels");
  //         }
  //       } catch (err: unknown) {
  //         setError(
  //           err instanceof Error
  //             ? err.message
  //             : "An error occurred while fetching banners"
  //         );
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCarousel();
  //   }, []);

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
              <Image
                src={carousel.image}
                alt="Carousel Image"
                width={420}
                height={220}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;

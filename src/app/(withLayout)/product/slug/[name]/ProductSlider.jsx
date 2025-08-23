import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductSlider({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="swipers">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data?.map((res, index) => (
          <SwiperSlide key={index}>
            <div className="md:w-[350px] md:h-[350px]">
              <img className="w-full h-auto" src={res} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        // centeredSlides={true}
        slidesPerView={6}
        // freeMode={true}
        // watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper !flex justify-center"
      >
        {data?.map((res, i) => (
          <SwiperSlide key={i} className="!w-auto flex justify-center">
            <div className="border p-2 w-16 h-16 md:w-20 md:h-20 ">
              <img className="w-full h-auto" src={res} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

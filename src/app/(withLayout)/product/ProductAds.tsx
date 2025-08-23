import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"

const ProductAds = () => {
    return (
        <div>
        <section className="w-full py-4 bg-gray-50">
          <div className="mx-auto w-full lg:w-3/4 px-4 bg-white rounded-xl shadow-md">
            <Swiper
              rewind={true}
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="group rounded-xl"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="p-5 flex  items-center justify-center gap-2 text-center transition-transform hover:scale-105 duration-300">
                  <img
                    alt="Fast Free Shipping"
                    src="https://cdn-img.oraimo.com/images/7b0f133418911f953b4727c4961fd4cf.webp"
                    className="w-7 h-7"
                  />
                  <p className="text-gray-800 font-medium text-[12px]">
                    Fast Free Shipping over ৳900
                  </p>
                </div>
              </SwiperSlide>
      
              {/* Slide 2 */}
              <SwiperSlide>
                <div className="p-5 flex  items-center justify-center gap-2 text-center transition-transform hover:scale-105 duration-300">
                  <img
                    alt="Cash on Delivery"
                    src="https://cdn-img.oraimo.com/images/bb7638cf96be3732cb81d0b550d64c51.webp"
                    className="w-7 h-7"
                  />
                  <p className="text-gray-800 font-medium text-[12px]">
                    Cash on Delivery
                  </p>
                </div>
              </SwiperSlide>
      
              {/* Slide 3 */}
              <SwiperSlide>
                <div className="p-5 flex  items-center justify-center gap-2 text-center transition-transform hover:scale-105 duration-300">
                  <img
                    alt="Hassle-Free Warranty"
                    src="https://cdn-img.oraimo.com/images/0ee516e36508c5688089f57a8ded3422.webp"
                    className="w-7 h-7"
                  />
                  <p className="text-gray-800 font-medium text-[12px]">
                    Hassle-Free Warranty
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      </div>
      
    );
};

export default ProductAds;
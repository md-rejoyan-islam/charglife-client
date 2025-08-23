import React, { useEffect, useState } from 'react';
import { config } from "@/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";
import ProductCard from "@/components/ProductCard";


const TopRatedProduct = ({ tags }: { tags: string }) => {
  const [campaign, setCampaign] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`${config.backend_url}/item/search?tags=${tags}`);
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
    <div>
      <div className="">
        <div className="relative">
          <Swiper
            className='mySwiper'
            modules={[Keyboard, Navigation, Autoplay, Pagination]}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            // pagination={{
            //     clickable: true,
            //   }}

            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
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
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProduct;
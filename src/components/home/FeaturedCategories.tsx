"use client";

import { config } from "@/config";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "../useMediaQuery";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
  type: string;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Check if screen is mobile size
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.backend_url}/category/featured`);
        const data = await response.json();

        setCategories(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
      </div>
    );
  }

  // Determine how many items to display
  // On desktop, show all categories. On mobile, show all if showAll is true, otherwise show 6
  const displayedCategories =
    !isMobile || showAll ? categories : categories.slice(0, 6);
  const hasMoreItems = isMobile && categories.length > 6;

  return (
    <section className="py-6 bg-gray-50">
      <div className="lg:container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-bold text-2xl">Featured Category</h2>
          <p className="font-medium">
            Get Your Desired Product from Featured Category!
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Using flex with wrap instead of grid to allow for centered last row */}
          <div className="lg:hidden w-full overflow-hidden   ">
            <Swiper
              rewind={true}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              centeredSlides={false}
              spaceBetween={6}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                },
                520: {
                  slidesPerView: 4,
                },
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                908: {
                  slidesPerView: 6,
                },
              }}
            >
              <div className="flex items-center justify-start gap-4">
                {displayedCategories.map((category) => (
                  <SwiperSlide
                    key={category._id}
                    className="py-10"
                    style={{ marginRight: "0px" }}
                  >
                    <SingleCategory category={category} />
                  </SwiperSlide>
                ))}
              </div>

              <div className="absolute inset-0 flex justify-between items-center">
                <div className="swiper-button-prev  " />
                <div className="swiper-button-next " />
              </div>
            </Swiper>
          </div>
          <div className="hidden lg:flex flex-wrap justify-center gap-4 w-full">
            {displayedCategories.map((category) => (
              <SingleCategory category={category} key={category._id} />
            ))}
          </div>

          {/* View More/Less Button - Only show on mobile if there are more than 6 items */}
          {hasMoreItems && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 border border-gray-200"
            >
              {showAll ? (
                <>
                  View Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  View More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

const SingleCategory = ({ category }: { category: Category }) => {
  return (
    <Link
      href={
        category.type == "category"
          ? `/product/${category?.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")}?category=${category._id}`
          : `/product/${category?.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")}?subCategory=${category._id}`
      }
      key={category._id}
      className=" group rounded-lg  shadow-[0_0_15px_15px_rgba(0,0,3,.05)] p-4 flex flex-col items-center justify-center transition-transform hover:scale-105  w-full lg:w-[calc(16.666%-16px)] xl:w-[calc(12.5%-16px)] max-w-[150px]"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3">
        {category.image ? (
          <img
            src={category.image || "/placeholder.svg"}
            alt={"product" + category.name}
            className=" w-16 md:w-20   group-hover:scale-x-[-1] duration-300 rounded-md h-20 object-contain"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <span className="text-xs">No icon</span>
          </div>
        )}
      </div>
      <span className="text-center text-sm font-medium">{category.name}</span>
    </Link>
  );
};

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

const WeekDealSwiperSlide = ({
  deal,
  weekDeal,
  swiperRef,
}: {
  deal: {
    id: string;
    productName: string;
    image: string;
    productImage: string[];
    keySpec: string;
    price: number;
  };
  weekDeal?: {
    discountValue: number;
    discountType: "percentage" | "fixed";
  };
  swiperRef: React.MutableRefObject<any>;
}) => {
  const [images, setImages] = useState<string[]>([
    deal.image || "/placeholder.svg",
    ...(deal.productImage || []),
  ]);

  console.log(".......");
  console.log(images);
  console.log(images.slice(1));
  console.log(".......");

  // 1. Use useState to manage the current main image URL
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg");

  // 2. Create a handler function to change the main image on thumbnail click
  const handleThumbnailClick = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      // Swap the clicked thumbnail with the main image
      [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
      return newImages;
    });
  };

  return (
    <SwiperSlide key={deal.id}>
      <div className="rounded-lg border-2 border-yellow-400 p-6">
        <div className="flex flex-col md:flex-row">
          {/* Left side with main product image and save badge */}
          <div className="relative flex-grow">
            {weekDeal && weekDeal?.discountValue > 0 && (
              <div className="absolute left-4 top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-center font-bold text-gray-800">
                <span>
                  Save{" "}
                  {`${weekDeal.discountValue}${
                    weekDeal.discountType == "percentage" ? "%" : "Tk"
                  }`}
                </span>
              </div>
            )}
            {weekDeal?.discountValue === 0 && (
              <div className="absolute left-4 top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-center font-bold text-gray-800">
                <span>Save 0</span>
              </div>
            )}

            <div className="flex justify-center  items-start ">
              <Link
                href={`/${deal?.productName
                  ?.replace(/\s+/g, "-")
                  ?.toLowerCase()}`}
                className="w-full h-fit"
              >
                <div className="relative w-full h-[280px] sm:h-[350px]  overflow-hidden group/image">
                  <Image
                    src={images[0] || "/placeholder.svg"}
                    alt={deal?.productName}
                    width={200}
                    height={200}
                    className="absolute top-0 left-0 w-full h-full object-contain transition-transform rounded-md duration-500 ease-in-out group-hover/image:-translate-x-full"
                  />
                  <Image
                    src={images[0] || "/placeholder.svg"}
                    alt={deal?.productName}
                    width={200}
                    height={200}
                    className="absolute rounded-md top-0 left-0 w-full h-full object-contain transition-transform duration-500 ease-in-out translate-x-full group-hover/image:translate-x-0"
                  />
                </div>
                {/* <Image
                  src={images[0] || "/placeholder.svg"}
                  alt={deal.productName}
                  width={400}
                  height={400}
                  className="mx-auto h-auto max-h-[300px] w-auto object-contain"
                /> */}
              </Link>
              {/* <div className="flex flex-col space-y-4">
                {images.slice(1)?.map((thumb: string, i: number) => (
                  <div
                    key={i}
                    className="border border-gray-200 p-1 bg-white"
                    onClick={() => handleThumbnailClick(i + 1)}
                  >
                    <Image
                      src={thumb || "/placeholder.svg"}
                      alt={`${deal.productName} thumbnail ${i + 1}`}
                      width={70}
                      height={70}
                      className="object-contain cursor-pointer h-[70px] w-[70px] border"
                    />
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Right side with content */}
          <div className="md:w-[300px] lg:w-[280px] xl:w-[350px] 2xl:w-[400px] md:pl-4 flex flex-col mt-4 md:mt-0">
            {/* Navigation controls at top */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex items-center text-[gray] hover:text-gray-900"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span>Previous Deal</span>
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="flex items-center text-[gray] hover:text-gray-900"
              >
                <span>Next Deal</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>

            {/* Product title */}
            <div className="mb-2">
              <Link
                href={`/${deal?.productName
                  ?.replace(/\s+/g, "-")
                  ?.toLowerCase()}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {deal.productName}
              </Link>
            </div>
            <p
              className="mb-3 hidden lg:block"
              dangerouslySetInnerHTML={{ __html: deal.keySpec }}
            ></p>
            <p
              className="mb-3 line-clamp-5 lg:hidden"
              dangerouslySetInnerHTML={{ __html: deal.keySpec }}
            ></p>
            {/* Price */}
            <div className="text-3xl font-bold text-gray-800 mb-6">
              ৳{deal.price.toFixed(2)}
            </div>

            {/* Thumbnails */}
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

export default WeekDealSwiperSlide;

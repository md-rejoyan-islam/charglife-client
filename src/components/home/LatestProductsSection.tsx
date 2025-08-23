"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import { config } from "@/config"



const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-[darkgray]"}`}
        />
      ))}
    </div>
  )
}

export default function LatestProductsSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef<any | null>(null)
      const [campaign, setCampaign] = useState<any>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchCampaign = async () => {
          try {
            const response = await fetch(`${config.backend_url}/item/search?tags=Latest Product`);
            const data = await response.json();
            
            setCampaign(data?.data?.result.slice(0,4) || {}); 
          } catch (error) {
            console.error("Failed to fetch brand data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCampaign();
      }, []);
  
      const [weekDeal, setWeekDeal] = useState<any>({applicableProducts:[]});

    useEffect(() => {
      const setWeekDeals = async () => {
        try {
          const response = await fetch(`${config.backend_url}/campaign?name=Deals of the week`);
          const data = await response.json();
    
          setWeekDeal(data?.data?.result[0] || {});
        } catch (error) {
          console.error("Failed to fetch brand data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      setWeekDeals();
    }, []);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Latest Products Section */}
        <div className="lg:col-span-1">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 relative">
  <h2 className="text-xl md:text-2xl relative inline-block">
  Latest Products
    <span className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-yellow-400"></span>
  </h2>
</div>
  

          <div className="mt-6 space-y-6">
            {campaign?.map((product:any) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="h-20 w-20 flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.productName}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/${product?.productName?.replace(/\s+/g, "-")?.toLowerCase()}`} className="text-sm font-medium text-[gray] hover:text-yellow-500">
                    {product.productName}
                  </Link>
                  <div className="mt-1">
                    <StarRating rating={product.ratings} />
                  </div>
                  <div className="mt-1 font-bold text-gray-800">৳{product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 mt-8">
      <h2 className="text-2xl font-medium text-gray-800">Deals of the week</h2>
      <div className="mt-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="deals-swiper"
        >
          {weekDeal?.applicableProducts?.map((deal: any, index: number) => (
            <SwiperSlide key={deal.id}>
              <div className="rounded-lg border-2 border-yellow-400 p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Left side with main product image and save badge */}
                  <div className="relative flex-grow">
                    {weekDeal?.discountValue > 0 && (
                      <div className="absolute left-4 top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-center font-bold text-gray-800">
                        <span>
                          Save {`${weekDeal.discountValue}${weekDeal.discountType == "percentage" ? "%" : "Tk"}`}
                        </span>
                      </div>
                    )}
                    {weekDeal?.discountValue === 0 && (
                      <div className="absolute left-4 top-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-center font-bold text-gray-800">
                        <span>Save 0</span>
                      </div>
                    )}

                    <div className="flex justify-center ">
                    <Link href={`/${deal?.productName?.replace(/\s+/g, "-")?.toLowerCase()}`}>
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.productName}
                      width={400}
                      height={400}
                      className="mx-auto h-auto max-h-[300px] w-auto object-contain"
                        />
                      </Link>
                                        <div className="flex flex-col space-y-4">
                      {deal?.productImage?.map((thumb: string, i: number) => (
                        <div key={i} className="border border-gray-200 p-1 bg-white">
                          <Image
                            src={thumb || "/placeholder.svg"}
                            alt={`${deal.productName} thumbnail ${i + 1}`}
                            width={70}
                            height={70}
                            className="object-contain h-[70px] w-[70px] border"
                          />
                        </div>
                      ))}
                    </div>
               </div>
                  </div>

                  {/* Right side with content */}
                  <div className="md:w-[300px] md:pl-4 flex flex-col mt-4 md:mt-0">
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
                      <Link href={`/${deal?.productName?.replace(/\s+/g, "-")?.toLowerCase()}`} className="text-lg font-medium text-blue-600 hover:underline">
                        {deal.productName}
                      </Link>
                    </div>
                    <p className="mb-3 hidden lg:block" dangerouslySetInnerHTML={{ __html: deal.keySpec }}></p>
                    <p
  className="mb-3 line-clamp-2 lg:hidden"
  dangerouslySetInnerHTML={{ __html: deal.keySpec }}
></p>
                    {/* Price */}
                    <div className="text-3xl font-bold text-gray-800 mb-6">৳{deal.price.toFixed(2)}</div>

                    {/* Thumbnails */}

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import NextImage from "next/image"
  import { Swiper, SwiperSlide } from "swiper/react"
  import { Navigation, Autoplay } from "swiper/modules"
import { config } from "@/config"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import the Loading component
const Loading = dynamic(() => import("@/app/loading"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>,
})

interface BannerData {
  _id: string
  image: string
  link: string
  description: string
  active: boolean
  bannerType: string
  createdAt: string
  updatedAt: string
}

export default function Banner() {
  const [banners, setBanners] = useState<BannerData[]>([])
  const [bannersSlider, setBannersSlider] = useState<BannerData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${config.backend_url}/banner`)
        const data = await response.json()
        if (data.success) {
          const sliderBanners = data.data.result.filter((res: BannerData) => res.bannerType === "slider")
          const staticBanners = data.data.result.filter((res: BannerData) => res.bannerType === "static")
          setBanners(staticBanners)
          setBannersSlider(sliderBanners)

          // Preload images
          sliderBanners.concat(staticBanners.slice(0, 2)).forEach((banner:any) => {
            const img = new Image()
            img.src = banner.image
          })
        } else {
          setError(data.message || "Failed to fetch banners")
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching banners")
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  if (loading) return <Loading />
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex lg:flex-nowrap flex-wrap gap-2 lg:mt-10 mt-6 px-2 lg:px-0">
        <div className="lg:w-2/3 w-full group relative">
          <Swiper
            rewind={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-lg"
          >
            {bannersSlider.map((banner, index) => (
              <SwiperSlide key={banner._id}>
                <NextImage
                style={{cursor:"pointer"}}
                  onClick={() => router.push(banner?.link || "/campaign")}
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.description}
                  height={500}
                  width={1000}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                />
              </SwiperSlide>
            ))}
            <div className="absolute inset-0 flex justify-between items-center">
              <div className="swiper-button-prev hidden lg:flex group-hover:flex bg-[#101010] hover:bg-[#251546] py-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <div className="swiper-button-next hidden lg:flex group-hover:flex bg-[#101010] hover:bg-[#251546] py-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
          </Swiper>
        </div>
        <div className="lg:w-1/3 w-full flex gap-4 lg:gap-2 lg:flex-col flex-row">
          {banners.slice(0, 2).map((banner, index) => (
            <div key={banner._id} className="rounded-lg relative overflow-hidden w-full">
              <NextImage
                 style={{cursor:"pointer"}}
                src={banner.image || "/placeholder.svg"}
                alt={`Banner ${index + 1}`}
                height={500}
                width={1000}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                onClick={() => router.push(banner?.link || "/campaign")}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              />
            </div>
          ))}
        </div>
      </div>

      <div>



      </div>
    </section>
  )
}


"use client"

import { useState, useEffect } from "react"
import NextImage  from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { config } from "@/config"

interface BannerData {
  _id: string
  image: string
  description: string
  active: boolean
}

export default function Popup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [banners, setBanners] = useState<BannerData[]>([])

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("popupSeen")) {
      setIsPopupVisible(true)
    }
  }, [])

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(`${config.backend_url}/banner?bannerType=popup`)
        const data = await response.json()
        if (data.success && data.data.result.length > 0) { 
          setBanners(data.data.result)
          // Preload the image
          if (data.data.result[0].image) {
            const img = new Image()
            img.src = data.data.result[0].image
          }
        } else {
          setIsPopupVisible(false)
        }
      } catch (error) {
        console.error("Failed to fetch banners", error)
        setIsPopupVisible(false)
      }
    }
    fetchBanners()
  }, [])

  const handleClosePopup = () => {
    setIsPopupVisible(false)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("popupSeen", "true")
    }
  }

  if (!isPopupVisible || banners.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-md rounded-lg overflow-hidden bg-white shadow-lg">
        <button
          onClick={handleClosePopup}
          className="absolute right-2 top-2 bg-red-500 p-2 rounded-full hover:bg-red-700"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <Link href="/campaign">
          {banners[0]?.image && (
            <NextImage 
              src={banners[0].image || "/placeholder.svg"}
              alt={banners[0].description || "Popup Banner"}
              width={500}
              height={300}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          )}
        </Link>
      </div>
    </div>
  )
}


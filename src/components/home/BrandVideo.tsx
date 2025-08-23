"use client";

import React, { useEffect, useState, useMemo } from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { config } from "@/config";

interface SliderItem {
  id: string | number;
  name: string;
  video: string;
}

const BrandVideo: React.FC = () => {
  const [data, setData] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.backend_url}/brand-video`, {
          cache: "no-store",
        });
        const result = await response.json();
        const slides = result?.data?.result || [];
        setData(slides);
        setCurrentSlide(Math.floor(slides.length / 2));
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  const getRelativeIndex = (index: number) => {
    const total = data.length;
    const diff = index - currentSlide;
    const half = Math.floor(total / 2);
    if (diff > half) return diff - total;
    if (diff < -half) return diff + total;
    return diff;
  };

  const getStyles = (relative: number): React.CSSProperties => {
    let scale = 1;
    let zIndex = 0;
    let opacity = 0;
    let filter = "blur(4px)";
    let translateZ = -800;

    if (relative === 0) {
      scale = 1;
      zIndex = 10;
      opacity = 1;
      filter = "none";
      translateZ = 0;
    } else if (Math.abs(relative) === 1) {
      scale = 0.96;
      zIndex = 8;
      opacity = 1;
      translateZ = -350;
    } else if (Math.abs(relative) === 2) {
      scale = 0.8;
      zIndex = 6;
      opacity = 1;
      translateZ = -280;
    }

    return {
      opacity,
      transform: `translateX(${relative * 240}px) translateZ(${translateZ}px) rotateY(${relative * -35}deg) scale(${scale})`,
      zIndex,
      filter,
      transition: "transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease",
      pointerEvents: relative === 0 ? "auto" : "none",
    };
  };

  const renderedSlides = useMemo(() => {
    return data.map((item, index) => {
      const relative = getRelativeIndex(index);

      // Only render visible and adjacent slides (lazy rendering)
      if (Math.abs(relative) > 2) return null;

      return (
        <div key={item.id} className="slide" style={getStyles(relative)}>
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${item.video}?rel=0`}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              // @ts-ignore
              fetchpriority={relative === 0 ? "high" : "low"}
            />
          </div>
          <p className="video-title">{item.name}</p>
        </div>
      );
    });
  }, [data, currentSlide]);

  if (loading) return <p>Loading...</p>;
  if (!data.length) return <p>No brand videos found.</p>;

  return (
    <div className="slider-wrapper">
      <div className="text-center space-y-1 pb-8">
        <h2 className="font-bold text-2xl">Brand Gallery</h2>
        <p className="font-medium">Watch our amazing brand gallery!</p>
      </div>
      <div className="slideC relative">
        {renderedSlides}
        <div className="nav-buttons absolute inset-y-1/2 w-full flex justify-between px-4 pointer-events-none">
          <LeftCircleOutlined className="btnd prevd pointer-events-auto" onClick={prev} />
          <RightCircleOutlined className="btnd nextd pointer-events-auto" onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default BrandVideo;

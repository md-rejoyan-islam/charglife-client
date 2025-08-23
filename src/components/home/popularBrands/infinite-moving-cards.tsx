"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    _id: string;
    image: string;
    description: string;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const router = useRouter()
  

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, index) => (
          <li
            className="w-[200px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-snow/90 px-2 mx-auto py-6 cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={index}
            onClick={()=>{router.push(`/product/${item?.name?.toLowerCase().replace(/\s+/g, '-')}?brand=${item?._id}`)}}
          >
            <blockquote >
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="mx-auto flex justify-center items-center">
                <Image src={item.image} height="200" width="400" alt="image" />
              </div>
              <p  className="relative z-21 leading-[1.2] text-gray-500 font-bold">
                {item.name}
              </p>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.description}
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

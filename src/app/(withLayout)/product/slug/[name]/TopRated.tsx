"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import TopRatedProduct from "./TopRatedProduct";
import { ProductSkeleton } from "../../ProductContainer";

interface Tab {
  id: string;
  label: string;
}
interface ProductTabsProps {
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function TopRated({
  defaultTab = "Top Rated",
  onTabChange
}: ProductTabsProps) {
  /* ───────── Tabs ───────── */
  const tabs: Tab[] = [
    { id: "featured", label: "Featured" },
    { id: "on-sale", label: "On Sale" },
    { id: "top-rated", label: "Top Rated" }
  ];

  /* ───────── State ───────── */
  const [activeTab, setActiveTab]   = useState(defaultTab);
  const [loading, setLoading]       = useState(false);
  const [holdHeight, setHoldHeight] = useState(false);   // lock height?
  const FIXED_HEIGHT = 430;                             // px
  const gridRef = useRef<HTMLDivElement>(null);

  /* ───────── Helpers ───────── */
  const nextFrame = () =>
    new Promise<void>(r => requestAnimationFrame(() => r()));

  const delay = (ms: number) =>
    new Promise<void>(r => setTimeout(r, ms));

  /* ───────── Click handler ───────── */
  const handleTabClick = async (label: string) => {
    if (label === activeTab) return;

    /* 1. start loading */
    setHoldHeight(true);   // lock height at 500 px
    setLoading(true);      // show skeleton
    await nextFrame();     // let skeleton paint

    /* 2. switch tab (cards start fetching inside <TopRatedProduct>) */
    setActiveTab(label);
    onTabChange?.(label);

    /* ----------- replace with real fetch time ----------- */
    await delay(300);
    /* ---------------------------------------------------- */

    /* 3. give React a frame to mount cards, +150 ms buffer */
    await nextFrame();
    await delay(150);

    /* 4. hide skeleton, unlock height */
    setLoading(false);
    // setHoldHeight(false);
  };

  /* ───────── Render helpers ───────── */
  const CardGrid = () => (
    <TopRatedProduct key={activeTab} tags={activeTab} />
  );

  const Skeleton = () => (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );

  /* ───────── JSX ───────── */
  return (
    <div className="w-full mt-8">
      {/* Tabs */}
      <div className="container mx-auto flex justify-center border-b border-gray-200">
        <div className="flex space-x-8 md:space-x-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.label)}
              className={cn(
                "py-4 px-1 relative font-medium transition-colors",
                activeTab === tab.label
                  ? "text-black font-bold"
                  : "text-darkgray font-light hover:text-gray-900"
              )}
            >
              {tab.label}
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 w-full flex justify-center">
                  <div className="relative w-full">
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-400" />
                    <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3 h-1 bg-yellow-400 rounded-full translate-y-[2px]" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-4">
        {loading && <Skeleton />}

        {/* Grid wrapper keeps height fixed while holdHeight === true */}
        <div
          ref={gridRef}
          style={{ height: holdHeight ? FIXED_HEIGHT : "auto" }}
        >
          {!loading && <CardGrid />}
        </div>
      </div>
    </div>
  );
}

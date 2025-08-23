"use client";

import {
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { config } from "@/config";
import { SearchIcon } from "lucide-react";

type Suggestion = {
  _id: string;
  productName: string;
  image: string;
  price?: number;
  ratings: number;
};

export default function SearchBox() {
  /* state */
  const router = useRouter();
  const [input, setInput] = useState("");
  const [openMobileBar, setOpenMobileBar] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  /* debounce fetch */
  useEffect(() => {
    const t = setTimeout(async () => {
      if (input.length > 0) {
        try {
          const r = await fetch(
            `${config.backend_url}/item/search?name=${input}`
          );
          const d = await r.json();
          setSuggestions(d.data.result);
        } catch (e) {
          console.error(e);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [input]);

  /* helpers */
  const go = () => {
    router.push(input ? `/product?name=${input}` : "/product");
    setInput("");
    setSuggestions([]);
    setOpenMobileBar(false);
  };
  const choose = (s: Suggestion) => {
    router.push(
      `/${s.productName.replace(/\s+/g, "-").toLowerCase()}`
    );
    setInput("");
    setSuggestions([]);
    setOpenMobileBar(false);
  };

  /* suggestion list */
  const SuggestList = () => (
    <ul className="divide-y divide-gray-200 rounded-md bg-white shadow-lg">
      {suggestions.map((s) => (
        <li
          key={s._id}
          onClick={() => choose(s)}
          className="cursor-pointer p-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={s.image}
              alt={s.productName}
              width={40}
              height={40}
              className="rounded object-cover"
            />
            <div className="flex-grow">
              <p className="truncate text-sm font-medium text-gray-900">
                {s.productName}
              </p>
              <p className="text-sm font-semibold text-primary-600">
                TK {s.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center rounded-full bg-yellow-100 px-1.5">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-800">
                {s.ratings.toFixed(1)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  /* JSX */
  return (
    <>
      {/* ─── mobile trigger + bar ─── */}
      <div className="relative md:hidden">
        {/* icon button */}
        <button
          onClick={() => setOpenMobileBar((p) => !p)}
          className=""
        >
           <SearchIcon className="h-7 w-7 text-gray-700 mt-2"/>
        </button>

        {/* slide‑down bar */}
        <div
  className={`fixed top-[60px] left-0 origin-top transform transition-all w-screen z-[20] ${
    openMobileBar
      ? "scale-y-100 opacity-100"
      : "scale-y-0 opacity-0 pointer-events-none"
  }`}
>
  <div className="mx-auto max-w-full rounded-lg border border-yellow-400 bg-white p-3 shadow-lg">
    <div className="flex max-w-md mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="flex-1 rounded-l-full border border-yellow-400 px-3 py-2 text-sm focus:outline-none"
      />
      <button
        onClick={go}
        className="rounded-r-full bg-yellow-400 px-3 py-2 text-white"
      >
         <SearchIcon className="h-5 w-5 text-gray-700"/>
      </button>
    </div>

    <div className="mt-2 max-h-64 overflow-auto">
  {input.length > 0 && suggestions.length === 0 ? (
    <p className="text-center text-sm text-gray-500 p-4">No products found</p>
  ) : (
    <SuggestList />
  )}
</div>

  </div>
</div>


      </div>

      {/* ─── desktop bar ─── */}
      <div className="relative hidden w-full max-w-2xl md:block">
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="camera"
            className="h-full w-full rounded-l-full border-2 border-r-0 border-yellow-400 px-4 py-3 text-sm focus:outline-none"
          />
          <button
            onClick={go}
            className="rounded-r-full bg-yellow-400 px-4 py-[1.75px] text-white hover:bg-yellow-500"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        {input.length > 0 && (
  <div className="absolute left-0 right-0 z-10 mt-2 max-h-64 overflow-auto rounded-lg shadow-lg bg-white">
    {suggestions.length === 0 ? (
      <p className="text-center text-sm text-gray-500 p-4">No products found</p>
    ) : (
      <SuggestList />
    )}
  </div>
)}

      </div>
    </>
  );
}

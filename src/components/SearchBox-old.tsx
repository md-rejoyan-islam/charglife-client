"use client";

import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { config } from "@/config";
import Image from "next/image";

type Suggestion = {
  _id: string;
  productName: string;
  image: string;
  displayPrice?: number;
  price?: number;
  ratings: number;
};

export default function SearchBox() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 2) {
        try {
          const response = await fetch(`${config.backend_url}/item/search?name=${input}`);
          const data = await response.json();
          setSuggestions(data.data.result);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [input]);

  function open() {
    setOpenSearch(true);
  }

  const handleSearch = () => {
    if (input) {
      router.push(`/product?name=${input}`);
    } else {
      router.push(`/product`);
    }
    setInput("")
  };

  const handleSearchForMobile = () => {
    if (input) {
      router.push(`/product?name=${input}`);
    } else {
      router.push(`/product`);
    }
    setOpenSearch(false);
    setInput("")
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    router.push(`/${suggestion.productName?.replace(/\s+/g, "-")?.toLocaleLowerCase()}`);
    setInput("");
    setSuggestions([]);
    setOpenSearch(false);
  };

  const renderSuggestions = () => (
    <ul className="bg-white shadow-lg rounded-md overflow-hidden divide-y divide-gray-200">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion._id}
          onClick={() => handleSuggestionClick(suggestion)}
          className={`md:p-4 p-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out ${
            index === 0 ? 'rounded-t-md' : ''
          } ${index === suggestions.length - 1 ? 'rounded-b-md' : ''}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={suggestion.image}
                alt={suggestion.productName}
                width={60}
                height={60}
                className="rounded-md object-cover shadow-sm"
              />
            </div>
            <div className="flex-grow">
            <h3 className="hidden md:block text-sm font-medium text-gray-900 truncate">
    {suggestion.productName}
              </h3>
              <h3 className="block md:hidden text-sm font-medium text-gray-900 truncate">
    {suggestion.productName.length>25?`${suggestion.productName?.slice(0, 25)}...`:suggestion.productName}
</h3>
              <p className="text-sm font-semibold text-primary-600">
                TK {suggestion?.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full ">
              <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-yellow-800">{suggestion.ratings.toFixed(1)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* for mobile */}
      <div className="md:hidden">


        <button onClick={open} className="bg-[#100f11] text-white ml-0 p-2 rounded-full shadow-md">
          <MagnifyingGlassIcon
            title="Search"
            width={20}
            className="text-primary-600 duration-100 hover:scale-125"
          />
        </button>
        <Dialog
          open={openSearch}
          onClose={() => setOpenSearch(false)}
         style={{position:"relative",zIndex:"9999"}}
        >
          <DialogBackdrop className="fixed inset-0 bg-black/80" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="relative mb-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Search Products"
                  className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                />
                <button
                  onClick={handleSearchForMobile}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#100f11] text-white p-2 rounded-full hover:bg-primary-600 transition-colors duration-200"
                >
                  <MagnifyingGlassIcon
                    width={20}
                    className="text-gray-400 hover:text-gray-600"
                  />
          
                </button>
              </div>
              {suggestions.length > 0 && (
                <div className="mt-4 max-h-[60vh] overflow-auto">
                  {renderSuggestions()}
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      </div>

      {/* for desktop */}
      <div className="hidden md:block w-full relative">
        <div className="flex items-center justify-center overflow-hidden w-full transition-all duration-200">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            style={{borderRadius:"20px 0 0 20px"}}
            placeholder="Search products..."
            className="pl-4 py-2 w-full h-full outline-none text-gray-700 border-none focus:ring-0 ring-0"
          />
          <button
          style={{padding:"9px"}}
            className="bg-[#100f11] rounded-r-full group hover:bg-primary-600 transition-colors duration-200"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon
              width={20}
              className="text-white transition-transform duration-300 ease-in group-hover:scale-125"
            />
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-10 max-h-[60vh] overflow-auto rounded-lg shadow-lg">
            {renderSuggestions()}
          </div>
        )}
      </div>
    </>
  );
}
"use client";

import ProductCard from "@/components/ProductCard";
import FieldFiltering from "@/components/shared/filter/FieldFiltering";
import FieldFilteringSelect from "@/components/shared/filter/FieldFilteringSelect";
import PriceFiltering from "@/components/shared/filter/PriceFiltering";
import { ApiResponse, Category, SubCategory } from "@/components/shared/Header";
import Pagination from "@/components/shared/Pagination";
import { config } from "@/config";
import { TProductResponse } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductAds from "./ProductAds";

const MIN = 1;
const MAX = 10000;

export const ProductSkeleton = () => (
  <div
    className="animate-pulse rounded-lg p-4 h-80"
    style={{ backgroundColor: "#e5e7eb" }}
  >
    <div
      className="h-48 mb-4 rounded"
      style={{ backgroundColor: "#d1d5db" }}
    ></div>
    <div
      className="h-4 w-3/4 mb-2 rounded"
      style={{ backgroundColor: "#d1d5db" }}
    ></div>
    <div
      className="h-4 w-1/2 mb-2 rounded"
      style={{ backgroundColor: "#d1d5db" }}
    ></div>
    <div
      className="h-8 w-1/4 rounded"
      style={{ backgroundColor: "#d1d5db" }}
    ></div>
  </div>
);

export default function ProductContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState<number[]>([MIN, MAX]);
  const [brand, setBrand] = useState<string[]>([
    searchParams.get("brand") ?? "",
  ]);
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? ""
  );
  const [subCategory, setSubCategory] = useState<string>(
    searchParams.get("subCategory") ?? ""
  );
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [subCategories, setSubCategories] = useState<Record<string, string>>(
    {}
  );
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (searchParams.get("category") ?? "") {
      setCategory(searchParams.get("category") ?? "");
      setSubCategory("");
    }
  }, [searchParams.get("category") ?? ""]);

  useEffect(() => {
    if (searchParams.get("subCategory") ?? "")
      setSubCategory(searchParams.get("subCategory") ?? "");
  }, [searchParams.get("subCategory") ?? ""]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.backend_url}/brand`);
        const data = await response.json();

        setBrands(
          data?.data?.result?.map((res: any) => {
            return {
              name: res?.name,
              value: res?._id,
            };
          }) || []
        );
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    fetch(`${config.backend_url}/category`)
      .then((response) => response.json())
      .then((json: ApiResponse<Category>) => {
        const categoryMap = json?.data?.result.reduce(
          (
            acc: Record<string, string>,
            item: { _id: string; name: string }
          ) => {
            acc[item._id] = item.name;
            return acc;
          },
          { all: "All" }
        );
        setCategories(categoryMap);
      });
  }, []);

  useEffect(() => {
    fetch(`${config.backend_url}/sub-category?`)
      .then((response) => response.json())
      .then((json: ApiResponse<SubCategory>) => {
        const subCategoryMap = json?.data?.result
          .filter((res: any) => res.category == category)
          .reduce(
            (
              acc: Record<string, string>,
              item: { _id: string; name: string }
            ) => {
              acc[item._id] = item.name;
              return acc;
            },
            {}
          );
        setSubCategories(subCategoryMap);
      });
  }, [category]);

  const name = searchParams.get("name") ?? "";

  const queryParams: Record<string, string | number | string[]> = {
    name: name,
    category: category.split(","),
    subCategory: subCategory.split(","),
    brand: brand.filter((b) => b !== ""),
    minPrice: price[0],
    maxPrice: price[1],
    page,
    limit: 20,
    // sortBy: orderBy == "" ? "createdAt" : "displayPrice",
    sortBy: orderBy == "" ? "serialNumber" : "displayPrice",
    sortOrder: orderBy === "desc" ? "desc" : "asc",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach((v) => {
              if (v !== "all") params.append(key, v);
            });
          } else if (value !== "" && value !== undefined && value !== "all") {
            params.append(key, value.toString());
          }
        });
        console.log("Fetching products with params:", params.toString());

        const response = await fetch(
          `${config.backend_url}/item/search?${params.toString()}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, [name, category, subCategory, brand, price, page, orderBy]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== undefined) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    //   const pathSegment = subCategory
    // ? `/product/${subCategories[subCategory]?.toLowerCase().replace(/\s+/g, '-')}`
    // : category
    // ? `/product/${categories[category]?.toLowerCase().replace(/\s+/g, '-')}`
    // : `/product`;

    if (categories[category]) {
      router.push(
        `/product/${categories[category]
          ?.toLowerCase()
          .replace(/\s+/g, "-")}?${params.toString()}`,
        undefined
      );
    }
  }, [categories, queryParams]);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="py-2 px-4">
        <ProductAds />

        <div className="flex gap-x-4 relative">
          <Transition show={isOpen} as={React.Fragment}>
            <Dialog
              onClose={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] overflow-y-auto lg:hidden bg-black/50"
            >
              <div className="min-h-screen px-4 text-center">
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                    >
                      <span> Filters</span>
                      <span onClick={() => setIsOpen(false)}>X</span>
                    </Dialog.Title>
                    <div className="mt-2 space-y-4">
                      <PriceFiltering
                        max={MAX}
                        min={MIN}
                        price={price}
                        setPrice={setPrice}
                      />
                      <FieldFiltering
                        label="Brand"
                        query={brand}
                        setQuery={setBrand}
                        data={brands}
                      />
                      <FieldFilteringSelect
                        label="Category"
                        query={category}
                        setQuery={(e) => {
                          setCategory(e);
                          setSubCategory("");
                        }}
                        data={Object.entries(categories)?.map(
                          ([key, value]) => {
                            return { name: value, value: key };
                          }
                        )}
                      />
                      <FieldFilteringSelect
                        label="Sub Category"
                        query={subCategory}
                        setQuery={setSubCategory}
                        data={Object.entries(subCategories)?.map(
                          ([key, value]) => {
                            return { name: value, value: key };
                          }
                        )}
                      />
                      {/* <FieldFiltering
                        label="Processor Type"
                        query={processor_type}
                        setQuery={setProcessorType}
                        data={productManager.processor_type}
                      /> */}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          <div className="hidden lg:block min-w-[300px] border rounded-md">
            <div className="space-y-3">
              <PriceFiltering
                max={MAX}
                min={MIN}
                price={price}
                setPrice={setPrice}
              />
              <FieldFiltering
                label="Brand"
                query={brand}
                setQuery={setBrand}
                data={brands}
              />
              <FieldFilteringSelect
                label="Category"
                query={category}
                setQuery={(e) => {
                  setCategory(e);
                  setSubCategory("");
                }}
                data={Object.entries(categories)?.map(([key, value]) => {
                  return { name: value, value: key };
                })}
              />
              <FieldFilteringSelect
                label="Sub Category"
                query={subCategory}
                setQuery={setSubCategory}
                data={Object.entries(subCategories)?.map(([key, value]) => {
                  return { name: value, value: key };
                })}
              />
              {/* <FieldFiltering
                label="Processor Type"
                query={processor_type}
                setQuery={setProcessorType}
                data={productManager.processor_type}
              /> */}
            </div>
          </div>

          <div className="space-y-5 w-full">
            <div className="px-5 py-3 bg-yellow-400 rounded flex items-center justify-between">
              <p className="hidden md:block">
                {name ||
                  (categories[category] || subCategories[subCategory]
                    ? `${categories[category] || ""}${
                        subCategories[subCategory]
                          ? ` > ${subCategories[subCategory]}`
                          : ""
                      }`
                    : "Products")}
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-x-1 md:hidden bg-secondary/10 px-3 py-1 rounded-md"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" /> Filter
              </button>
              <div className="flex items-center gap-x-3 text-nowrap">
                <p>Sort by: </p>
                <select
                  onChange={(e) => setOrderBy(e.target.value)}
                  name="orderBy"
                  id="orderBy"
                  className="text-sm"
                >
                  <option value="">Default</option>
                  <option value="asc">Price (Low &gt; High)</option>
                  <option value="desc">Price (High &gt; Low)</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : !products?.data?.result?.length ? (
              <p className="text-2xl text-accent text-black">
                Sorry, No Product Found!
              </p>
            ) : (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {products.data.result.map((product: TProductResponse) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </div>
                {products?.data?.totalPages > 1 && (
                  <Pagination
                    currentPage={products?.data?.currentPage || page}
                    totalPages={products?.data?.totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

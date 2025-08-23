"use client";

import AddToCart from "@/components/product/product-details/AddToCart";
import AddToWish from "@/components/product/product-details/AddToWishlist";
import ProductFAQ from "@/components/product/product-details/ProductFAQ ";
import { StarFilled } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import ProductSlider from "./ProductSlider";
import ReviewSection from "./ReviewSection";
import SimilarProduct from "./SimilarProduct";
import YouTubeEmbed from "./YouTubeVideo";

type Props = {
  product: any;
};

export default function ProductDetailsClient({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product?.inventory[0]);

  const productInfo = {
    id: product?._id,
    name: `${product?.productName} (${selectedVariant?.productName})`,
    photo: selectedVariant?.img || product?.image,
    price: selectedVariant?.displayPrice || product?.price,
    productQuantity: 1,
    variantId: selectedVariant?._id,
    freeShipping: product.freeShipping,
  };

  console.log("productInfo", product);

  return (
    <section className="max-w-7xl mx-auto p-5">
      {/* Product Header Section */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Product Images Carousel */}
          <div>
            <ProductSlider
              data={[
                selectedVariant?.img || product?.image, // Show selected variant image first
                ...(selectedVariant?.img ? [] : product?.productImage || []),
                product?.image, // Show other images only if no variant selected
                ...product?.inventory?.map((res: any) => res.img),
              ]}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <div>
              <span className="text-2xl font-bold">{product?.productName}</span>
              <Link
                href="#review"
                className="flex items-center gap-2 text-yellow-500"
              >
                <StarFilled className="" />
                <span className="font-semibold">
                  {product?.ratings
                    ? `${product.ratings?.toFixed(1)} Stars`
                    : "No ratings"}
                </span>
              </Link>
            </div>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-[#ffea4a21] text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-all duration-300 ease-in-out">
                Price :{" "}
                <span className="text-gray-800 text-lg font-bold">
                  ৳{selectedVariant?.displayPrice || product?.displayPrice}{" "}
                </span>{" "}
                {selectedVariant?.price && (
                  <span className="line-through text-gray-200 text-sm">
                    ৳{selectedVariant?.price}
                  </span>
                )}
              </span>
              <span className="bg-[#ffea4a21] flex items-center text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-all duration-300 ease-in-out">
                Regular Price :{" "}
                {selectedVariant?.price && (
                  <span className="text-gray-500 text-sm">
                    ৳{selectedVariant?.price}
                  </span>
                )}
              </span>
              <span className="bg-[#ffea4a21] flex items-center text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-all duration-300 ease-in-out">
                Status :{" "}
                {selectedVariant?.quantity > 0 ? `In Stock` : " Out of Stock"}
              </span>
            </div>
            {/* <p className="text-gray-600 text-lg py-4">{product?.description?.slice(0, 150)}...</p> */}

            <div className="mb-4">
              <h6 className="font-semibold">Key Features</h6>
              <p dangerouslySetInnerHTML={{ __html: product?.keySpec }}></p>
              <Link
                href="#specification"
                className=" text-yellow-400 underline mt-2"
              >
                More Info
              </Link>
            </div>

            {/* Inventory Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Available Variants:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.inventory.map((variant: any) => (
                  <button
                    key={variant._id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex flex-col items-center p-2 rounded-md border ${
                      selectedVariant?._id === variant._id
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={variant.img} // Assuming variant.image contains the image URL
                      alt={variant.productName}
                      className="w-16 h-16 object-cover rounded-md mb-1"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {variant.productName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Availability */}
            {/* <div className="flex items-center gap-5">
              <span className="text-3xl font-bold text-red-500">
                ৳{selectedVariant?.displayPrice?.toFixed(2) || product?.displayPrice?.toFixed(2)}
              </span>
              {selectedVariant?.price && (
                <span className="line-through text-gray-500 text-lg">৳{selectedVariant?.price?.toFixed(2)}</span>
              )}
            {selectedVariant?.quantity > 0 ? (
  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-[10px]">
    In Stock
  </span>
) : (
  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px]">
    Out of Stock
  </span>
)}

            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-1">
              <AddToCart
                product={productInfo}
                disabled={selectedVariant?.quantity > 0 ? false : true}
              />
              <AddToWish product={productInfo} />
            </div>
            {product?.tags?.length > 0 && (
              <div className="flex gap-3 items-center pt-3">
                <h3 className="font-semibold text-gray-800">Tags</h3>
                <div className="flex gap-3 flex-wrap">
                  {product?.tags
                    ?.filter((res: any) => res?.hide == false)
                    ?.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="bg-[#e9e9e9] text-black px-6 py-1 rounded-full text-[13px] font-medium shadow-sm hover:bg-blue-200 transition-all duration-300 ease-in-out"
                      >
                        {tag?.name}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="linkButtonTabs">
        {/* <Link href="#details" className="linkBtn active">
        Details
        </Link> */}
        <Link href="#specification" className="linkBtn active">
          Specification
        </Link>
        <Link href="#description" className="linkBtn">
          Description
        </Link>
        <Link href="#faq" className="linkBtn">
          FAQ
        </Link>
        <Link href="#question" className="linkBtn">
          Questions
        </Link>
        <Link href="#review" className="linkBtn">
          Reviews
        </Link>
      </div>

      {/* Product Details Section */}
      {/* <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="details">
        <h3 className="text-2xl font-semibold">Product Details</h3>
        <ProductInfo product={product} />
      </section> */}

      {/* Product Information */}
      {/* SPECIFICATION SECTION */}
      <section
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        id="specification"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
          Specification
        </h3>
        <p className="px-4 py-2 bg-[#ffea4a21] rounded-lg text-[#000]">
          Basic Information
        </p>
        <div className="px-4">
          <table className="w-full text-sm text-gray-700 ">
            <tbody className="divide-y divide-gray-200 px-6">
              {product?.brand?.name && (
                <tr className="py-3">
                  <td className="py-2 font-semibold w-1/3">Brand</td>
                  <td>{product.brand.name}</td>
                </tr>
              )}
              {product?.sku && (
                <tr>
                  <td className="py-2 font-semibold">SKU</td>
                  <td>{product.sku}</td>
                </tr>
              )}
              {product?.inventory?.quantity && (
                <tr>
                  <td className="py-2 font-semibold">Stock Quantity</td>
                  <td>{product.inventory.quantity}</td>
                </tr>
              )}
              {product?.variants?.length > 0 &&
                product.variants.map((variant: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 font-semibold capitalize">
                      {variant?.type}
                    </td>
                    <td>{variant?.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        id="description"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
          Description
        </h3>
        <div className="text-[15px] leading-7 text-gray-800 space-y-4">
          <div dangerouslySetInnerHTML={{ __html: product?.description }} />

          {/* {product?.variants?.length > 0 && (
        <div className="flex gap-3 flex-wrap pt-5">
          {product.variants.map((variant: any) => (
            <div
              key={variant._id}
              className="text-sm flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium shadow-sm hover:bg-blue-200 transition"
            >
              <span className="capitalize">{variant.type}</span>
              <span className="font-semibold">: {variant.value}</span>
            </div>
          ))}
        </div>
      )} */}

          {product?.tags?.length > 0 && (
            <div className="flex gap-4 flex-wrap pt-3">
              {product?.tags
                ?.filter((res: any) => res?.hide == false)
                ?.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:bg-blue-200 transition"
                  >
                    {tag?.name}
                  </span>
                ))}
            </div>
          )}
        </div>
      </section>

      {product?.youtube && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <YouTubeEmbed videoUrl={product?.youtube} />
        </div>
      )}

      <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="faq">
        <div className="mb-1">
          <h3 className="text-2xl font-semibold mb-3">FAQ</h3>
          <div dangerouslySetInnerHTML={{ __html: product?.question }}></div>
        </div>
      </section>

      <section id="question">
        <ProductFAQ product={product} />
      </section>

      {/* Reviews Section */}
      <section id="review">
        <ReviewSection product={product} />
      </section>

      {/* Similar Product  */}
      <SimilarProduct product={product} />
    </section>
  );
}

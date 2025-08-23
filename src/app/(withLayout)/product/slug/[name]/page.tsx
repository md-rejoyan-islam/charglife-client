import React, { Suspense } from "react";
import ProductDetailsWrapper from "./ProductDetailsWrapper";
import { Metadata } from "next";
import { config } from "@/config";

type Props = {
  params: {  name: string };
};

// Fetch product details on the server
async function getProductDetails(slug: string) {
  try {
    const res = await fetch(`${config.backend_url}/item/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensures fresh data
    });

    if (!res.ok) throw new Error("Failed to fetch product details");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductDetails(params.name);

  if (!product) {
    return {
      title: "Product Not Found | Charg Tech",
      description: "The requested product is not available.",
    };
  }

  return {
    title: `${product.productName} | Charg Tech`,
    description: product.description,
    openGraph: {
      title: product.productName,
      description: product.description,
      url: `https://charglife.com/product/${params.name}/${params.name}`,
      images: [
        {
          url: product.image || "https://charglife.com/default-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.productName,
      description: product.description,
      images: [product.image || "https://yourwebsite.com/default-image.jpg"],
    },
  };
}

// Loader Component
function Loader() {
  return <div className="text-center p-4">Loading product details...</div>;
}

// Page Component (Pass Product Data as Props)
export default async function ProductDetails({ params }: Props) {
  const product = await getProductDetails(params.name);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ProductDetailsWrapper product={product} />
    </Suspense>
  );
}

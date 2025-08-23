import { config } from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductDetailsWrapper from "../product/slug/[name]/ProductDetailsWrapper";

import Loading from "@/app/loading";
import DynamicPage from "@/components/DynamicPage/DynamicPage";
import { cookies } from "next/headers";

type Props = {
  params: { name: string };
};

async function getProductDetails(name: string) {
  try {
    const cookieStore = cookies();
    const offer = cookieStore.get("offer")?.value ?? "";

    const res = await fetch(
      `${config.backend_url}/item/by-name/${name}?offer=${offer}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Primary fetch error:", error);
    return null;
  }
}

async function getFallbackProductDetails(name: string) {
  try {
    const res = await fetch(`${config.backend_url}/page/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fallback fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductDetails(params.name);

  if (!product) {
    const fallbackProduct = await getFallbackProductDetails(params.name);

    if (!fallbackProduct) {
      return {
        title: "Product Not Found | Charg-life",
        description: "The requested product is not available.",
      };
    }

    return {
      title: fallbackProduct.name,
    };
  }

  return {
    title: `${product.productName} | Charg-life`,
    description: product.description,
    openGraph: {
      title: product.productName,
      description: product.description,
      url: `https://charglife.com/${params.name}`,
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
      images: [product.image || "https://charglife.com/default-image.jpg"],
    },
  };
}

function Loader() {
  return <Loading />;
}

export default async function ProductDetails({ params }: Props) {
  const product = await getProductDetails(params.name);
  const productAvailability =
    product?.inventory[0]?.quantity > 0 ? "InStock" : "OutOfStock";

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.productName,
    image: [product.image, ...(product.productImage || [])],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand.name || "Charg-life",
    },
    offers: {
      "@type": "Offer",
      url: `https://charglife.com/${params.name}`,
      priceCurrency: "BDT",
      price: product.price,
      availability: `https://schema.org/${productAvailability}`,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (product) {
    return (
      <Suspense fallback={<Loader />}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductDetailsWrapper product={product} />
      </Suspense>
    );
  }

  const fallbackProduct = await getFallbackProductDetails(params.name);

  if (fallbackProduct) {
    return (
      <Suspense fallback={<Loader />}>
        <DynamicPage data={fallbackProduct} />
      </Suspense>
    );
  }

  return <div className="text-center text-red-500">Product not found</div>;
}

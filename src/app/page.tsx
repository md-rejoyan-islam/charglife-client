// import GadgetFest from "@/components/home/GadgetFest";
import Process from "@/components/home/Process";
// import FlashDeals from "@/components/home/FlashDeals";
// import PopularCategories from "@/components/home/PopularCategories";
// import FeaturedCategory from "@/components/home/FeaturedCategory";
import Banner from "@/components/home/Banner";
import BrandVideo from "@/components/home/BrandVideo";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TopProduct from "@/components/home/TopProduct";
import Popup from "@/components/ui/Popup";
import HomeLayout from "./(withLayout)/layout";
import TopRated from "./(withLayout)/product/slug/[name]/TopRated";
// import PromotionalBanners from "@/components/home/PromotionalBanners";
import WhatsappFloating from "@/components/floating/whatsapp-floating";
import LatestProductsSection from "@/components/home/LatestProductsSection";
import SaveBig from "@/components/home/SaveBig";
import SmallPromotionalBanners from "@/components/home/SmallPromotionalBanners";
import Carousel from "@/components/home/carousel";

// const Popup = lazy(() => import("@/components/ui/Popup"));
// const Banner = lazy(() => import("@/components/home/Banner"));

export default async function HomePage() {
  return await HomeLayout({
    children: (
      <>
        <Popup />
        <Banner />
        <Carousel />
        <SmallPromotionalBanners />
        <FeaturedCategories />
        <BrandVideo />
        <TopRated />
        <LatestProductsSection />
        {/* <TopFetured /> */}
        {/* <FlashDeals /> */}
        {/* <GadgetFest /> */}
        {/* <FeaturedCategory /> */}
        <SaveBig />
        {/* <PromotionalBanners /> */}
        <TopProduct />
        <Process />
        <WhatsappFloating />
      </>
    ),
  });
}

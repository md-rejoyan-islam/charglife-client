import Footer from "@/components/shared/Footer";
import Newslatter from "@/components/shared/Newslatter";
import TopHeader from "@/components/shared/TopHeader";
import { fetchFooterData, fetchHeaderData } from "@/lib/api";
import React from "react";

type HomeLayoutProps = {
  children: React.ReactNode;
};

async function getLayoutData() {
  const [headerData, footerData] = await Promise.all([
    fetchHeaderData(),
    fetchFooterData(),
  ]);

  return { headerData, footerData };
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const { headerData, footerData } = await getLayoutData();

  return (
    <>
      {/* <Navbar /> */}
      <TopHeader menuItems={headerData} />
      {/* <Header menuItems={headerData} /> */}
      {children}
      <Newslatter />
      <Footer addresses={footerData?.address} socials={footerData?.social} />
    </>
  );
}

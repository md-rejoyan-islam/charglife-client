import type React from "react"
import "./globals.css"
import dynamic from "next/dynamic"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import Script from "next/script"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/pagination"

const Wrapper = dynamic(() => import("@/components/provider/Wrapper"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-white" />,
})
const CartSidebar = dynamic(() => import("@/components/ui/cart-sidebar/cart-sidebar"), {
  ssr: false,
})

export const metadata = {
  title: "CHARG | Gadget that charge your life",
  description:
    "Shop high-quality chargers, headphones, power banks, and more. Discover top-notch electronic accessories at affordable prices.",
  keywords: [
    "electronic accessories",
    "chargers",
    "headphones",
    "power banks",
    "mobile phone accessories",
    "TWS",
    "neckband",
    "audio devices",
  ],
  authors: [{ name: "CHARGLIFE" }],
  robots: "index, follow",
  icons: {
    icon: "/img/logo.png",
  },
  openGraph: {
    title: "CHARGLIFE - Your One-Stop Shop for Electronic Accessories",
    description:
      "Shop high-quality chargers, headphones, power banks, and more. Discover top-notch electronic accessories at affordable prices.",
    images: "/img/logo.png",
    url: "https://charglife.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHARGLIFE - Your One-Stop Shop for Electronic Accessories",
    description:
      "Shop high-quality chargers, headphones, power banks, and more. Discover top-notch electronic accessories at affordable prices.",
    images: "/img/logo.png",
  },
  other: {
    "msvalidate.01": "DDFE02A6C2DF8973BB860F5EB85E990E",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          as="style"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          />
        </noscript>
      </head>

      <body className="font-inter">
        {/* Critical above-the-fold content */}
        <Suspense
          fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Wrapper>
            <Toaster />
            <CartSidebar />
            <main>{children}</main>
          </Wrapper>
        </Suspense>

        {/* Non-critical scripts loaded after content */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MNH8B4SR');
          `}
        </Script>

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '655185790658035');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RG4EMJRFV3" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RG4EMJRFV3');
          `}
        </Script>

        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNH8B4SR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=655185790658035&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  )
}

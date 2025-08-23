// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* ✅ Google Site Verification */}
          <meta name="google-site-verification" content="LpovF_W8xL7UAn11yP9G4PsA29CsidRzNxtKeAlMWyk" />
        </Head>
        <body>
          {/* ✅ Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MNH8B4SR"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

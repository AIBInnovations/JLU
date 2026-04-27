import type { Metadata } from 'next';
import Script from 'next/script';
import { inter, anton, humane } from './fonts';
import SmoothScroll from './SmoothScroll';
import PageLoader from '../components/PageLoader';
import { Header } from '../components/Header';
import { GlobalWidgets } from '../components/GlobalWidgets';
import '../index.css';

export const metadata: Metadata = {
  title: 'Jagran Lakecity University',
  description: 'Jagran Lakecity University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${humane.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NQHT5W3');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="color-scheme" content="light" />
        <style dangerouslySetInnerHTML={{ __html: `html,body{background-color:#f6f7f0!important;color-scheme:light}` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=sessionStorage.getItem('scrollPos_'+location.pathname);if(s&&+s>0){window.scrollTo(0,+s)}}catch(e){}`,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQHT5W3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <PageLoader />
        <SmoothScroll />
        <Header />
        {children}
        <GlobalWidgets />
        {/* NoPaperForms AI Chat Agent */}
        <div
          className="npf_ai_agents"
          data-w="3bda6f65de8448d9a5dc3b6d2d0faa37"
        />
        <Script
          id="npf-ai-agent"
          strategy="afterInteractive"
          src="https://o10qwyo06e.in6.agent.nopaperforms.com/en-gb/backend/agents/aiagentscpt.js/10a203f2852f41c18914147c42802132/3bda6f65de8448d9a5dc3b6d2d0faa37"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Force NPF chat widget to bottom-left */
              [id^="npf"], [class*="npf_"], iframe[src*="nopaperforms"] {
                right: auto !important;
                left: 20px !important;
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

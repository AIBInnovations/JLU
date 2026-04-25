import type { Metadata } from 'next';
import { inter, anton, humane } from './fonts';
import SmoothScroll from './SmoothScroll';
import PageLoader from '../components/PageLoader';
import ScrollDebug from '../components/ScrollDebug';
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
        <ScrollDebug />
        <Header />
        {children}
        <GlobalWidgets />
      </body>
    </html>
  );
}

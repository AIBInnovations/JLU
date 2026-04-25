import type { Metadata } from 'next';
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
        <meta name="color-scheme" content="light" />
        <style dangerouslySetInnerHTML={{ __html: `html,body{background-color:#f6f7f0!important;color-scheme:light}` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=sessionStorage.getItem('scrollPos_'+location.pathname);if(s&&+s>0){window.scrollTo(0,+s)}}catch(e){}`,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <PageLoader />
        <SmoothScroll />
        <Header />
        {children}
        <GlobalWidgets />
      </body>
    </html>
  );
}

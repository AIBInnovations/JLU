import type { Metadata } from 'next';
import Script from 'next/script';
import { inter, anton, humane } from './fonts';
import SmoothScroll from './SmoothScroll';
import PageLoader from '../components/PageLoader';
import { Header } from '../components/Header';
import { GlobalWidgets } from '../components/GlobalWidgets';
import '../index.css';

const SITE_URL = 'https://www.jlu.edu.in';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jagran Lakecity University Bhopal | Top University in MP | Admissions 2026',
    template: '%s | Jagran Lakecity University',
  },
  description:
    "Jagran Lakecity University, Bhopal — Central India's QS Diamond-rated university. 50+ programs, 45+ global partnerships, 80%+ placement rate. Apply 2026-27.",
  keywords: [
    'Jagran Lakecity University',
    'JLU Bhopal',
    'best university in Bhopal',
    'top private university in MP',
    'top university in Madhya Pradesh',
    'MBA admissions 2026 Madhya Pradesh',
    'QS Diamond rated university India',
    'university admissions 2026',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Jagran Lakecity University',
    title: 'Jagran Lakecity University Bhopal | Top University in MP | Admissions 2026',
    description:
      "Central India's QS Diamond-rated university. 50+ programs, 45+ global partnerships, 80%+ placement rate. Apply 2026-27.",
    locale: 'en_IN',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Jagran Lakecity University, Bhopal — Central India\'s QS Diamond-rated university',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagran Lakecity University Bhopal | Top University in MP',
    description:
      "Central India's QS Diamond-rated university. 50+ programs, 45+ global partnerships, 80%+ placement rate. Apply 2026-27.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  '@id': `${SITE_URL}/#organization`,
  name: 'Jagran Lakecity University',
  alternateName: 'JLU',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: OG_IMAGE,
  description:
    "Jagran Lakecity University (JLU), Bhopal is Central India's QS Diamond-rated university offering 50+ undergraduate, postgraduate and doctoral programs across schools of Management, Law, Engineering, Liberal Arts, Hospitality, Journalism, Architecture and Design, Education, and Humanities & Social Sciences.",
  foundingDate: '2013',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mugaliyachap, Chandanpura',
    addressLocality: 'Bhopal',
    addressRegion: 'Madhya Pradesh',
    postalCode: '462044',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/JagranLakecityUniversity',
    'https://www.instagram.com/jagranlakecityuniversity',
    'https://www.linkedin.com/school/jagran-lakecity-university',
    'https://twitter.com/jlubhopal',
    'https://www.youtube.com/@JagranLakecityUniversity',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'admissions',
    email: 'admissions@jlu.edu.in',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  award: [
    'QS I-GAUGE Diamond Rated University',
    'University of the Year (ASSOCHAM) for five consecutive years',
    'India Today Top University Rankings 2025',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Jagran Lakecity University',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
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
        {/* Preconnect + preload above-fold S3 assets to cut LCP */}
        <link rel="preconnect" href="https://jlu-website-media.s3.ap-south-1.amazonaws.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://jlu-website-media.s3.ap-south-1.amazonaws.com" />
        <link
          rel="preload"
          as="image"
          href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/optimized/herobg-new.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/heronew.webp"
          fetchPriority="high"
        />
        <meta name="color-scheme" content="light" />
        <style dangerouslySetInnerHTML={{ __html: `html,body{background-color:#f6f7f0!important;color-scheme:light}` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=sessionStorage.getItem('scrollPos_'+location.pathname);if(s&&+s>0){window.scrollTo(0,+s)}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
          strategy="lazyOnload"
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

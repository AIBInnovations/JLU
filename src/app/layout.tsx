import type { Metadata } from 'next';
import { inter, anton, humane } from './fonts';
import SmoothScroll from './SmoothScroll';
import { Header } from '../components/Header';
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
      <body className={inter.className}>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}

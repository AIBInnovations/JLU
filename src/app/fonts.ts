import { Inter, Anton } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
});

export const humane = localFont({
  src: '../../public/fonts/Humane-Bold.ttf',
  weight: '700',
  variable: '--font-humane',
  display: 'swap',
});

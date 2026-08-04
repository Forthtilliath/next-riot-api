import { Goldman, Poppins } from 'next/font/google';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import Footer from '@/features/Footer';
import Navbar from '@/features/navbar/Navbar';

import { routing } from '@/i18n/routing';

import '@/styles/globals.scss';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const goldman = Goldman({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-goldman',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700'],
  variable: '--font-poppins',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${goldman.variable} ${poppins.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

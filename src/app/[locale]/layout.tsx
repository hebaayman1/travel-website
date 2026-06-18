import type { ReactNode } from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Geist, Geist_Mono } from "next/font/google"
import { Cairo } from "next/font/google"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "../globals.css"

type Locale = (typeof routing.locales)[number]

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
})

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })

  return {
    title: "TravelCo - Explore the World with Us",
    description: t("description"),
    keywords: ["tourism", "travel agency", "travel packages", "tours"],
    openGraph: {
      title: "TravelCo - Explore the World with Us",
      description: t("description"),
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

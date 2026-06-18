"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"

const navLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/#services" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
]

export default function Navbar() {
  const t = useTranslations("nav")
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const otherLocale = locale === "ar" ? "en" : "ar"
  const otherLabel = otherLocale === "ar" ? "العربية" : "English"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-text">TravelCo</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => router.replace(pathname, { locale: otherLocale })}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
              {otherLabel}
            </button>
            <Button asChild>
              <Link href="/#contact">{t("contactBtn")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-text-muted hover:text-primary transition-colors text-base font-medium py-2"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <button
                onClick={() => {
                  setMobileOpen(false)
                  router.replace(pathname, { locale: otherLocale })
                }}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-4"
              >
                <Globe className="h-4 w-4" />
                {otherLabel}
              </button>
              <Button asChild>
                <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                  {t("contactBtn")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

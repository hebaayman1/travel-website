"use client"

import { useTranslations } from "next-intl"
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">TravelCo</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{t("description")}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {[
                { key: "home", href: "#hero" },
                { key: "services", href: "#services" },
                { key: "about", href: "#about" },
                { key: "contact", href: "#contact" },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.key === "home"
                      ? "Home"
                      : link.key === "services"
                        ? "Services"
                        : link.key === "about"
                          ? "About Us"
                          : "Contact"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Travel Street, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+971 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@travelco.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">{t("copyright")}</p>
          <a
            href="#hero"
            className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
          >
            <ChevronUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

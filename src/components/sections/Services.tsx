"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Globe,
  Building,
  Plane,
  Package,
  Bus,
  FileText,
  LucideIcon,
} from "lucide-react"

const serviceIcons: LucideIcon[] = [
  Globe,
  Building,
  Plane,
  Package,
  Bus,
  FileText,
]

export default function Services() {
  const t = useTranslations("services")
  const items = t.raw("items") as Array<{ title: string; description: string }>

  return (
    <section id="services" className="py-24 bg-background-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = serviceIcons[index]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

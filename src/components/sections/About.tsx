"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { Briefcase, Users, MapPin } from "lucide-react"

export default function About() {
  const t = useTranslations("about")

  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&q=80"
                alt="Travel agency team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 hidden lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              {t("title")}
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              {t("description")}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {t("mission")}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t("missionText")}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {t("vision")}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t("visionText")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {[
            { icon: Briefcase, value: "10+", label: t("stats.years") },
            { icon: Users, value: "5000+", label: t("stats.travelers") },
            { icon: MapPin, value: "50+", label: t("stats.destinations") },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-background-light border border-border"
            >
              <stat.icon className="h-10 w-10 text-primary mb-4" />
              <span className="text-4xl font-bold text-text mb-2">
                {stat.value}
              </span>
              <span className="text-text-muted text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createContactSchema, type ContactFormData } from "@/lib/validations"
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const t = useTranslations("contact")
  const v = useTranslations("contact.validation")
  const d = useTranslations("contact.details")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const contactSchema = useMemo(
    () =>
      createContactSchema({
        nameRequired: v("nameRequired"),
        nameMin: v("nameMin"),
        emailRequired: v("emailRequired"),
        emailInvalid: v("emailInvalid"),
        phoneRequired: v("phoneRequired"),
        phoneMin: v("phoneMin"),
        countryRequired: v("countryRequired"),
        countryMin: v("countryMin"),
        messageRequired: v("messageRequired"),
        messageMin: v("messageMin"),
      }),
    [v],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setStatus("idle")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed")

      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  const contactDetails = [
    { icon: MapPin, label: "Address", value: d("address") },
    { icon: Phone, label: "Phone", value: d("phone") },
    { icon: Mail, label: "Email", value: d("email") },
    { icon: Clock, label: "Working Hours", value: d("hours") },
  ]

  return (
    <section id="contact" className="py-24 bg-background-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-text">{t("info")}</h3>
            <div className="space-y-6">
              {contactDetails.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text">{item.label}</p>
                      <p className="text-text-muted text-sm">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-5"
            >
              <div>
                <Input
                  placeholder={t("form.name")}
                  {...register("name")}
                  className={errors.name ? "ring-2 ring-red-400" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Input
                    placeholder={t("form.email")}
                    {...register("email")}
                    className={errors.email ? "ring-2 ring-red-400" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder={t("form.phone")}
                    {...register("phone")}
                    className={errors.phone ? "ring-2 ring-red-400" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  placeholder={t("form.country")}
                  {...register("country")}
                  className={errors.country ? "ring-2 ring-red-400" : ""}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder={t("form.message")}
                  {...register("message")}
                  className={errors.message ? "ring-2 ring-red-400" : ""}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? t("form.sending") : t("form.submit")}
              </Button>

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  {t("success")}
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {t("error")}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

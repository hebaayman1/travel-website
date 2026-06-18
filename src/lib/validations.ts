import { z } from "zod"

export type ValidationMessages = {
  nameRequired: string
  nameMin: string
  emailRequired: string
  emailInvalid: string
  phoneRequired: string
  phoneMin: string
  countryRequired: string
  countryMin: string
  messageRequired: string
  messageMin: string
}

export function createContactSchema(messages: ValidationMessages) {
  return z.object({
    name: z
      .string()
      .min(1, messages.nameRequired)
      .min(2, messages.nameMin),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: z
      .string()
      .min(1, messages.phoneRequired)
      .min(5, messages.phoneMin),
    country: z
      .string()
      .min(1, messages.countryRequired)
      .min(2, messages.countryMin),
    message: z
      .string()
      .min(1, messages.messageRequired)
      .min(10, messages.messageMin),
  })
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>

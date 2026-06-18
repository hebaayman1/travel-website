import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendContactEmail } from "@/lib/email"

const serverSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(2),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = serverSchema.parse(body)

    await sendContactEmail(data)

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.issues },
        { status: 400 },
      )
    }

    console.error("Contact form error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

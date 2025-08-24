import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import User from 'app/models/User'
import { registrationSchema } from '@/lib/validators'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const parsed = registrationSchema.parse(body)

    const user = await User.findOneAndUpdate(
      { email: parsed.email },
      { $setOnInsert: parsed, verified: false },
      { new: true, upsert: true }
    )

    return NextResponse.json({ ok: true, userId: user._id })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}

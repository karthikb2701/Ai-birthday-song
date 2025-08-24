import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import User from '@/app/models/User'

const HARD_CODED_OTP = '1234'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { userId, otp } = await req.json()
    if (otp !== HARD_CODED_OTP) return NextResponse.json({ ok: false, error: 'Invalid OTP' }, { status: 400 })
    await User.findByIdAndUpdate(userId, { verified: true })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}

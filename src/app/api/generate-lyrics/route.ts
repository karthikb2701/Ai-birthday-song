import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import Preference from 'app/models/Preference'
import { buildBirthdayPrompt } from 'app/utils/prompt'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { userId, receiverName, genre, gender } = await req.json()

    const prompt = buildBirthdayPrompt(receiverName, genre, gender)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful lyricist who strictly follows constraints.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
    })

    const lyrics = completion.choices[0]?.message?.content?.trim() || ''

    const pref = await Preference.findOneAndUpdate(
      { userId },
      { receiverName, genre, gender, lyrics },
      { upsert: true, new: true }
    )

    return NextResponse.json({ ok: true, lyrics: pref.lyrics })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}

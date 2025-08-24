import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'NO_TTS_API' })
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'audio/mpeg',
    },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', optimize_streaming_latency: 2 })
  })

  if (!res.ok) {
    const msg = await res.text()
    return NextResponse.json({ ok: false, error: msg }, { status: 400 })
  }

  const audio = Buffer.from(await res.arrayBuffer())
  return new Response(audio, { headers: { 'Content-Type': 'audio/mpeg' } })
}

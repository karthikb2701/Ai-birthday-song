import * as z from 'zod'

export const registrationSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[0-9]{10,15}$/, 'Enter 10-15 digit phone'),
})

export const detailsSchema1 = z.object({
  receiverName: z.string().trim().min(2).max(50),
  genre: z.enum(['pop','rock','hiphop','acoustic','jazz','edm','bollywood','classical']),
})

export const detailsSchema2 = z.object({
  gender: z.enum(['male','female']),
  occasionDate: z.string().optional(),
  extraNotes: z.string().max(200).optional(),
})

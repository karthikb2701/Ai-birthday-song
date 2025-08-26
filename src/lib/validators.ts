// validators.ts
import * as z from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required (min 2 characters)" }).max(50, { message: "Name must be under 50 characters" }),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(100, { message: "Email too long" }),
  phone: z.string().trim().regex(/^[0-9]{10,15}$/, { message: "Enter 10-15 digit phone number" }),
});

// ✅ Details1 — Loved one info
export const detailsSchema1 = z.object({
  name: z.string().trim().min(2, { message: "Their name is required" }).max(50, { message: "Name must be under 50 characters" }),
  age: z.string().min(1, { message: "Please select an age" }),
  gender: z.enum(["male", "female", "other"], { message: "Please select a gender" }),
});

// ✅ Details2 — Mood/Genre/Voice

export const detailsSchema2 = z.object({
    mood: z.enum(["happy", "romantic", "funny", "motivational", "calm"], {
      message: "Please select a mood",
    }),
    genre: z.enum(["rap", "rock", "pop", "desi", "edm"], {
      message: "Please select a genre",
    }),
    gender: z.enum(["male", "female"], {
      message: "Please select a singer’s voice",
    }),
  });

// ✅ (Optional) If you later need notes/date
export const detailsSchema3 = z.object({
  occasionDate: z.string().max(20, { message: "Date string too long" }).optional(),
  extraNotes: z.string().max(200, { message: "Notes must be under 200 characters" }).optional(),
});

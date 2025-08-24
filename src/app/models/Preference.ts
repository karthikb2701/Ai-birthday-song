import { Schema, models, model, Types } from 'mongoose'

const PreferenceSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    receiverName: { type: String, required: true },
    genre: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    occasionDate: { type: Date },
    extraNotes: { type: String },
    lyrics: { type: String },
    ttsUrl: { type: String },
  },
  { timestamps: true }
)

export default models.Preference || model('Preference', PreferenceSchema)

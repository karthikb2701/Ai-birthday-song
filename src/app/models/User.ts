import { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)

import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "editor";
  accessToken?: string;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  EDITOR = "editor",
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: /.+@.+\..+/,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

// index for search query
UserSchema.index({ name: "text", email: "text" });

// Export the Mongoose model
export const UserModel = model<UserDocument>("User", UserSchema);

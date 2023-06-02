import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  savedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "notes" }],
});

export const UserModel = new mongoose.model("users", UserSchema);

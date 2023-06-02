import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  authorName: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

export const NotesModel = new mongoose.model("notes",NotesSchema);

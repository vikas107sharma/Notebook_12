import express from "express";
import { NotesModel } from "../models/note.js";
import { UserModel } from "../models/user.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/getnotes", async (req, res) => {
  const result = await NotesModel.find({});
  res.status(200).json(result);
});

router.get("/getnotebyid/:noteID", async (req, res) => {
  const { noteID } = req.params;
  console.log(noteID);
  const note = await NotesModel.findById(noteID);
  res.status(200).json(note);
});

router.get("/filterednotes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const result = await NotesModel.find({ tag });
  res.json(result);
});

router.post("/createnotes", verifyToken, async (req, res) => {
  const { topic, code, tag, author, time, authorName, videoURL } = req.body;

  const newUserNote = new NotesModel({
    topic,
    code,
    tag,
    time,
    author,
    authorName,
    videoURL,
  });
  newUserNote
    .save()
    .then((user) => {
      res.json({ message: "A note is created" });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put("/savenotes", verifyToken, async (req, res) => {
  const { userID, noteID } = req.body;
  UserModel.findById(userID)
    .then((user) => {
      user.savedNotes.push(noteID);
      user.save();
      res.json({ message: "Saved notes updated" });
    })
    .catch((err) => {
      console.log(err, " while savenotes");
    });
});

router.put("/updatenotes", verifyToken, (req, res) => {
  console.log(req.body);
  const { noteID, code, userID, author } = req.body;
  if (author === userID) {
    NotesModel.updateOne({ _id: noteID }, { code: code }).then((note) => {
      res.status(200).json({ message: "notes updated" });
    });
  } else {
    res.status(403).json({ message: `${note.authorName} cannot update` });
  }
});

router.put("/removesaves", verifyToken, async (req, res) => {
  const { userID, noteID } = req.body;
  UserModel.updateOne({ _id: userID }, { $pull: { savedNotes: noteID } }).then(
    () => {
      res.json({ message: "removed from saves" });
    }
  );
});

router.delete("/deletenote", verifyToken, async (req, res) => {
  const { noteID } = req.body;
  NotesModel.deleteOne({ _id: noteID }).then(() => {
    res.status(200).json({ message: "note deleted" });
  });
});

export { router as notesRouter };

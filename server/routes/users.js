import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";
import { NotesModel } from "../models/note.js";

const router = express.Router();

// Made post req using thunderclient : Body -> JSON
router.post("/register", async (req, res) => {
  const { username, password, avatar } = req.body;

  // Check if user already present
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exist" });
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword, avatar });
  await newUser
    .save()
    .then((user) => {
      const token = jwt.sign({ id: user._id }, "secret");
      res.json({ token, userID: user._id });
    })
    .catch((err) => {
      console.log(err, "err");
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  // if user doesnot exist
  if (!user) {
    return res.json({ message: "User does not exist" });
  }

  // if password not matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password incorrect" });
  }

  // if all correct
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.get("/getuserbyid/:userID", async (req, res) => {
  const userID = req.params.userID;
  UserModel.findById(userID).then((user) => {
    res.json(user);
  });
});

router.get("/creatednotes/:userID", async (req, res) => {
  const userID = req.params.userID;
  NotesModel.find({ author: userID }).then((creatednotes) => {
    res.json(creatednotes);
  });
});

router.get("/savednotes/:userID", async (req, res) => {
  const userID = req.params.userID;
  UserModel.findById(userID).then((user) => {
    NotesModel.find({ _id: { $in: user.savedNotes } }).then((noteslist) => {
      res.json(noteslist);
    });
  });
});

router.put("/changeavatar", (req, res) => {
  const { userID, avatar } = req.body;
  console.log( "change avatar", userID, avatar);
  UserModel.updateOne({ _id: userID }, { avatar: avatar }).then((user) => {
    console.log(user);
    res.status(200).json({ message: "avatar updated" });
  });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403); // forbidden
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

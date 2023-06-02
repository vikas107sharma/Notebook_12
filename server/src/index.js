import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "../routes/users.js";
import { notesRouter } from "../routes/notes.js";

const app = express();

app.use(express.json());
app.use(cors());

let connect = false;

mongoose.connect(
  "mongodb+srv://vikas1141sharma:notebook123@notebook.gnjjuja.mongodb.net/notebook"
);
mongoose.connection.on("connected", async () => {
  await console.log("Connected");
  connect = true;
});
mongoose.connection.on("error", (err) =>
  console.log("Connection failed with - ", err)
);

app.use("/auth", userRouter);
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.json({message: `server is running and ${connect}`});
});

app.listen(3000, () => {
  console.log("Server running");
});

import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useCookies } from "react-cookie";
import {
  Bookmark,
  Fullscreen,
  RemoveBookmark,
} from "../utils/TooltipIcon";

const NoteCard = ({ note, saved }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [savedd, setsavedd] = useState(saved);
  const [m, setM] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const toggle = () => {
    setM((prev) => (prev = !prev));
  };

  const saveNote = async (id) => {
    if (userID) {
      if (!savedd) {
        setSaving(true);
        const res = await axios
          .put(
            "http://localhost:3000/notes/savenotes",
            {
              userID: userID,
              noteID: id,
            },
            { headers: { authorization: cookies.access_token } }
          )
          .then(() => {
            setSaving(false);
            setsavedd(true);
          });
      } else {
        setRemoving(true);
        const res = await axios
          .put(
            "http://localhost:3000/notes/removesaves",
            {
              userID: userID,
              noteID: id,
            },
            { headers: { authorization: cookies.access_token } }
          )
          .then(() => {
            setRemoving(false);
            setsavedd(false);
          });
      }
    } else {
      alert("Login to save notes");
    }
  };

  return (
    <div className="block rounded-lg lg:w-[900px] md:w-[700px] bg-white mt-4 mb-4 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="flex justify-between">
        <h1 className="mb-2 capitalize inline-block text-xl mr-2 text-[#3C79F5] font-medium leading-tight">
          {note.topic}
          {note.author === userID && (
            <span className="text-rose-500 ml-3 text-sm">You</span>
          )}
        </h1>
        {cookies.access_token && <span className="cursor-pointer " onClick={() => saveNote(note._id)}>
          {saving ? (
            <span>saving...</span>
          ) : removing ? (
            <span>removing...</span>
          ) : (
            ""
          )}
          {savedd ? <RemoveBookmark /> : <Bookmark />}
        </span>}

        <Link to={`/singlepage/${note._id}`} ><Fullscreen /></Link>
      </div>
      <pre
        className={`mb-4 text-base ${
          m === false ? "max-h-[50px]" : "h-auto"
        } overflow-hidden whitespace-pre-wrap keep-all`}
      >
        {note.code}
      </pre>
      <div className="flex gap-2 flex-wrap justify-between">
        <span className="text-[#6C00FF]">{note.tag}</span>
        <span className="text-[#6C00FF]">{note.authorName}</span>
        <span className="text-xs pt-[7px] Time text-gray-400">{note.time}</span>

        <button
          className="text-[#2dcddf] hover:text-[#2cadbb]"
          onClick={toggle}
        >
          {!m ? "Show more..." : "Show less..."}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

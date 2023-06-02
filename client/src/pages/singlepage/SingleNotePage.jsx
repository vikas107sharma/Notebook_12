import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import axios from "axios";
import { HEADING, HR } from "../../utils/pieces";
import "./singlepagestyle.css";
import { FullscreenExit } from "../../utils/TooltipIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UPLOADDATE } from "../../custom/singlePageComp/SinglePageComponent";
import TextField from "../../custom/singlePageComp/TextField";
import { useCookies } from "react-cookie";

const singleNotePage = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [dark, setDark] = useState(false);
  const [text, setText] = useState();
  const [edit, setEdit] = useState(false);

  const [avatar, setAvatar] = useState(
    "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
  );
  const [authorID, setAuthorID] = useState("");
  const { noteID } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});

  let canUpdate = false;
  if (note.author === userID) {
    canUpdate = true;
  }

  useEffect(() => {
    const getNoteById = async () => {
      const res = await axios.get(
        `http://localhost:3000/notes/getnotebyid/${noteID}`
      );

      // console.log("note ", res.data);
      setNote(res.data);
      setText(res.data.code);
      // console.log(res.data.author);
      setAuthorID(res.data.author);

      if (res.data.author != undefined) {
        getu(res.data.author);
      } else {
        console.log("Login first");
      }
    };

    const getu = async (creator) => {
      // console.log("author of note", creator);
      const res = await axios.get(
        `http://localhost:3000/auth/getuserbyid/${creator}`
      );
      // console.log("user ", res);
      setAvatar(res.data.avatar);

    };
    getNoteById();
  }, []);


  const updateNote = async () => {
    const res = await axios.put(
      "http://localhost:3000/notes/updatenotes",
      { noteID: noteID, author: note.author, code: text, userID: userID },
      { headers: { authorization: cookies.access_token } }
    );
    console.log("response ", res);
  };


  const toggle = () => {
    setDark((prev) => !prev);
  };

  const handleUpdate = () => {
    setEdit(false);
    updateNote();
  };

  const deleteNote = () => {
    axios
      .delete("http://localhost:3000/notes/deletenote", {
        data: { noteID: noteID },
        headers: { authorization: cookies.access_token },
      })
      .then(() => {
        navigate("/");
        alert("deleted successfully");
      });
  };

  return (
    <>
      <div className="flex flex-col  w-[60%] m-auto  ">
        <div className="mb-[200px] bg-white shadow">
          <div className="flex gap-2 m-2">
            <div className="w-[50px] h-[50px] rounded-full ">
              <img src={avatar} alt="" />
            </div>

            <div className="ml-2 w-[80%]">
              <h1 className="text-xl w-[100%] Title font-semibold ">
                {note?.topic}
              </h1>
              <div className="flex items-center gap-2">
               {authorID && <Link to={`/notecreatorprofile/${authorID}`}>
                  <span className="text-xs pt-1">{note?.authorName}</span>
                </Link>}

                <UPLOADDATE date={note?.time} />
              </div>
            </div>

            <div
              className="ml-auto cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FullscreenExit />
            </div>
          </div>

          <HR />

          <div className="w-[100%] m-4 ">
            <ReactPlayer controls url={note?.videoURL} />
          </div>

          <HR />

          <div className="m-2">
            <div className="flex relative items-center w-[100%] justify-between p-2">
              <HEADING />
              <div className="mt-4 cursor-pointer " onClick={toggle}>
                {!dark ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
              {edit && (
                <div
                  className="absolute z-50 right-[20px] top-[95px]"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  <ClearIcon />
                </div>
              )}
            </div>

            {!edit ? (
              <pre
                className={`${
                  dark == true
                    ? "bg-zinc-800 text-white"
                    : "bg-gray-100 text-zinc-800"
                } p-2 transition-all duration-300 `}
                onClick={() => {
                  if (canUpdate) {
                    setEdit(true);
                  }
                }}
              >
                {text}
              </pre>
            ) : (
              <TextField text={text} dark={dark} setText={setText} />
            )}
          </div>

          {canUpdate && (
            <div className="m-3 flex items-center justify-between">
              {!edit && (
                <Fab
                  color="secondary"
                  aria-label="edit"
                  variant="contained"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <EditIcon />
                </Fab>
              )}
              {edit && (
                <Tooltip title="Update" placement="right">
                  <Fab
                    variant="contained"
                    color="warning"
                    onClick={handleUpdate}
                  >
                    <UpdateIcon />
                  </Fab>
                </Tooltip>
              )}

              <Fab
                aria-label="edit"
                variant="contained"
                color="error"
                onClick={() => deleteNote()}
              >
                <DeleteIcon />
              </Fab>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default singleNotePage;



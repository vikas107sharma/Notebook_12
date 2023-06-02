import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HR } from "../utils/pieces";
import { FullscreenExit } from "../utils/TooltipIcon";
import NoteCard from "../components/NoteCard";

const NoteCreatorProfile = () => {
  const { creatorID } = useParams();
  const [creator, setCreator] = useState({});
  const [creatednotes, setCreatednotes] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const [savedNotesID, setSavedNotesID] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/getuserbyid/${creatorID}`)
      .then((res) => {
        setCreator(res.data);
        // console.log(res.data);
        getSavedNotes();
      });

    const getSavedNotes = async () => {
      const response = await axios.get(
        `http://localhost:3000/auth/savednotes/${creatorID}`
      );
      setSavedNotes(response.data);
      // console.log("saved notes ", response.data);
      let savedID = response.data.map((d) => {
        return d["_id"];
      });
      setSavedNotesID(savedID);
      // console.log("savedID", savedID)
      // console.log("savedNotesId " ,savedNotesID)
      getCreatedNotes();
    };

    const getCreatedNotes = async () => {
      const response = await axios.get(
        `http://localhost:3000/auth/creatednotes/${creatorID}`
      );
      setCreatednotes(response.data);
      // console.log("created notes ", response.data);
    };
  }, [creatorID]);

  return (
    <>
      <div className="flex flex-col  w-[60%] m-auto  ">
        <div className="mb-[200px] bg-white shadow">
          <div className="flex gap-2 m-2">
            <div className="w-[70px] h-[70px] rounded-full ">
              <img src={creator?.avatar} alt="" />
            </div>
            <div className="ml-2 w-[80%]">
              <div className="flex items-center gap-2">
                <span className="text-[1.15rem] pt-1">{creator?.username}</span>
              </div>
            </div>
            <div
              className="ml-auto cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back
            </div>
          </div>

          <HR />

          <h1>Created Notes</h1>
          {creatednotes.length > 0 &&
            creatednotes.map((note) => {
              return (
                <NoteCard
                  key={note._id}
                  saved={savedNotesID.includes(note._id) ? true : false}
                  note={note}
                />
              );
            })}

          <h1>Saved Notes</h1>
          {savedNotes.length > 0 &&
            savedNotes.map((note) => {
              return <NoteCard key={note._id} saved={true} note={note} />;
            })}
        </div>
      </div>
    </>
  );
};

export default NoteCreatorProfile;

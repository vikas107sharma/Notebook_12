import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import "./homestyle.css";
import Filter from "../components/Filter";
import { BackDropLoader } from "../utils/Loaders";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncNotes,
  fetchAsyncSavedNotes,
  getAllNotes,
  getAllSavedNotes,
  getUserById,
} from "../redux/NotesSlice";

const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [active, setActive] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const dispatch = useDispatch();
  let notes = [];
  notes = useSelector(getAllNotes);

  let savedNotesAll = [];
  savedNotesAll = useSelector(getAllSavedNotes);
  let user ={};
  user = useSelector(getUserById);
  let savedNotes = ["empty"];
  // console.log(savedNotes[0]);
  
  if(savedNotesAll.length>0){
    savedNotes = savedNotesAll.map((d) => {
      return d["_id"];
    });
    // console.log("savednotes ", savedNotes)
  }

  useEffect(()=>{
    dispatch(fetchAsyncNotes());
    dispatch(fetchAsyncSavedNotes(userID));
  },[dispatch])

  const chooseTag = (s) => {
    setActive(s.id);
    filtereNotes(s.id);
  };

  const filtereNotes = (tag) => {
    const fn = notes.filter((note) => note.tag === tag);
    setFilteredNotes(fn);
  };

  const returnToAll = () => {
    setFilteredNotes([]);
    setActive("");
  };

  return (
    <>
      <div className="flex mt-2">
        <Filter
          filteredNotes={filteredNotes}
          chooseTag={chooseTag}
          returnToAll={returnToAll}
          active={active}
        />

        <div className="lg:ml-[280px] ml-[120px]">
          {filteredNotes.length > 0 && (
            <>
              <h1 onClick={returnToAll} className="text-purple-800 text-center">
                Return back to all....
              </h1>
              {filteredNotes.map((note) => {
                return (
                  <NoteCard
                    key={note._id}
                    saved={savedNotes.includes(note._id) ? true : false}
                    note={note}
                  />
                );
              })}
            </>
          )}
          {filteredNotes.length < 1 && (
            <>
              {(notes.length < 1 || user?.savedNotes === undefined) && (
                <p>Loading...</p>
              )}
              {notes.length < 1 && (user?.savedNotes!= undefined) && <p>Notebook is empty</p>}
              {notes.length > 0 && savedNotes[0]!=="empty" && (user?.savedNotes!= undefined) && (
                <>
                  {notes.map((note) => {
                    return (
                      <NoteCard
                        key={note._id}
                        saved={savedNotes.includes(note._id) ? true : false}
                        note={note}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

// TODO: what if notebook is empty 
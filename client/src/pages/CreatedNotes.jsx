import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncCreatedNotes, getAllCreatedNotes } from "../redux/NotesSlice";

const CreatedNotes = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const dispatch = useDispatch();
  console.log(cookies.access_token, " access_token");
  let notes = [];
  
  if (cookies.access_token && typeof userID !== "undefined") {
    notes = useSelector(getAllCreatedNotes);
  }

  useEffect(()=>{
    dispatch(fetchAsyncCreatedNotes(userID));
  },[dispatch, cookies.access_token])

  return (
    <div>
      {cookies.access_token ? (
        <div className="flex w-full lg:justify-center md:ml-4 sm:ml-2">
          <div className="flex flex-col lg:w-[70%] md:w-[90%] w-[100%] ">
            {notes.length>0 && notes.map((note) => {
              return <NoteCard key={note._id} note={note} />;
            })}
            {notes.length === 0 && (
              <Link
                to="/createnote"
                className="break-all text-blue-500 mt-[10vh] text-center"
              >
                Please click to create notes...
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="shadow-sm w-[80%] m-auto">
          <Link to="/login">
            <h1 className="text-xl m-4">
              Please login to see your created notes
            </h1>
            <button
              className="bg-[#6C00FF] mt-4 hover:bg-[#6919da] m-4 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatedNotes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const SavedNotes = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/auth/savednotes/${userID}`
      );
      setNotes(response.data);
    };

    if (cookies.access_token) {
      fetchData();
    }
  }, []);

  return (
    <div>
      {cookies.access_token ? (
        <div className="flex w-full lg:justify-center md:ml-4 sm:ml-2">
          <div className="flex flex-col lg:w-[70%] md:w-[90%] w-[100%] ">
            {notes.map((note) => {
              return <NoteCard key={note._id} saved={true} note={note} />;
            })}
            {notes.length === 0 && (
              <Link to="/">
                <h1 className="text-xl m-4">No saved notes</h1>
                <button
                  className="bg-[#6C00FF] mt-4 hover:bg-[#6919da] m-4 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Home
                </button> 
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="shadow-sm w-[80%] m-auto">
          <Link to="/login">
            <h1 className="text-xl m-4">
              Please login to see your saved notes
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

export default SavedNotes;

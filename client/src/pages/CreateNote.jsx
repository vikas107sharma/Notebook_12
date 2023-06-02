import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getDate } from "../utils/getDate";


const CreateNote = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const username = window.localStorage.getItem("username")+"";
  console.log(username);
  console.log(cookies.access_token, " access_token");
  const date = getDate();

  const [d, setD] = useState({
    topic: "",
    code: "",
    tag: "",
    author: userID,
    authorName: username,
    time: date,
    videoURL: "",
  });

  const createNoteFun = () => {};

  const handlechange = (key, e) => {
    setD((state) => {
      return {
        ...state,
        [key]: e.target.value,
      };
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (d.topic != "" && d.code != "" && d.tag != "" && d.videoURL!="") {
      axios
        .post("http://localhost:3000/notes/createnotes", d, {headers : {authorization: cookies.access_token}})
        .then(() => {
          alert("Notes created");
          navigate("/");
        })
        .catch((err) => {
          console.log(err, " error in createNote");
        });
    } else {
      alert("All fields must be filled");
    }
  };

  const options = [
    { value: "c++", label: "c++" },
    { value: "java", label: "java" },
    { value: "python", label: "python" },
    { value: "webd", label: "webd" },
    { value: "other", label: "other" },
  ];
  const handleSelect = (key, e) => {
    setD((state) => {
      return {
        ...state,
        [key]: e.value,
      };
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className=" p-4 shadow lg:w-[60%] md:w-80% w-[90%]">
        {cookies.access_token ? (
          <div>
            <h1 className="text-2xl text-center font-medium p-3">
              Create Note
            </h1>
            <hr />
            <form onSubmit={handleSubmit}>
              <label className="text mt-3 mb-1" htmlFor="topic">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                className="bg-gray-50 border shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => handlechange("topic", e)}
                value={d.topic}
              />
              <label className="text mt-3 mb-1" htmlFor="videoURL">
                Add video link
              </label>
              <input
                type="text"
                id="videoURL"
                className="bg-gray-50 border shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => handlechange("videoURL", e)}
                value={d.videoURL}
              />
              <label className="text mt-3 mb-1" htmlFor="select">
                Select a language
              </label>
              <Select
                id="select"
                options={options}
                onChange={(e) => handleSelect("tag", e)}
              />
              <label className="text mt-3 mb-1" htmlFor="code">
                Write your code
              </label>
              <textarea
                type="text"
                id="code"
                rows="4"
                class="block p-2.5 w-full shadow-sm text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handlechange("code", e)}
                value={d.code}
              />

              <Fab color="primary" aria-label="add"
                className="bg-[#6C00FF]  rounded-lg p-2 mt-3 text-white hover:bg-[#5902d2]"
                type="submit"
              >
                <AddIcon/>
              </Fab>
            </form>
          </div>
        ) : (
          <>
            <Link to="/login">
              <h1 className="text-xl m-4">Please login to create note</h1>{" "}
              <button
                className="bg-[#6C00FF] mt-4 hover:bg-[#6919da] m-4 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNote;

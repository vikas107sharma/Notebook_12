import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import CreateNote from "./pages/CreateNote";
import CreatedNotes from "./pages/CreatedNotes";
import SavedNotes from "./pages/SavedNotes";
import FormikForm from "./pages/FormikForm";
import FormikLogin from "./pages/FormikLogin";
import SingleNotePage from "./pages/singlepage/SingleNotePage";
import NoteCreatorProfile from "./pages/NoteCreatorProfile";
import { useDispatch } from "react-redux";
import { fetchAsyncCreatedNotes, fetchAsyncGetuserById, fetchAsyncNotes, fetchAsyncSavedNotes } from "./redux/NotesSlice";
import { useCookies } from "react-cookie";

// TODO:
// sharing is caring , share your notes

function App() {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  // console.log(userID)
  const dispatch = useDispatch();

  useEffect(()=>{
    if (cookies.access_token) {
      dispatch(fetchAsyncGetuserById(userID));
    }
  },[dispatch,cookies.access_token])

  return (
    <>
      <div className="app">
        <Header />
        <div className="pt-[95px]">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<FormikLogin />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/creatednotes" element={<CreatedNotes />} />
            <Route path="/savednotes" element={<SavedNotes />} />
            <Route path="/singlepage/:noteID" element={<SingleNotePage/>} />
            <Route path="/notecreatorprofile/:creatorID" element={<NoteCreatorProfile/>} />
            <Route path="/register" element={<FormikForm/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

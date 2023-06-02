import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncNotes = createAsyncThunk(
  "notes/fetchAsyncNotes",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/notes/getnotes"
    );
    return response.data;
  }
);

export const fetchAsyncSavedNotes = createAsyncThunk(
  "notes/fetchAsyncSavedNotes",
  async (userID) => {
    const response = await axios.get(
        `http://localhost:3000/auth/savednotes/${userID}`
    );
    return response.data;
  }
);

export const fetchAsyncCreatedNotes = createAsyncThunk(
  "notes/fetchAsyncCreatedNotes",
  async (userID) => {
    const response = await axios.get(
        `http://localhost:3000/auth/creatednotes/${userID}`
    );
    return response.data;
  }
);

export const fetchAsyncGetuserById = createAsyncThunk(
  "notes/fetchAsyncGetuserById",
  async (userID) => {
    const response = await axios.get(
        `http://localhost:3000/auth/getuserbyid/${userID}`
    );
    return response.data;
  }
);

const initialState = {
  notes: {},
  savednotes:{},
  creatednotes:{},
  user: {},
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // removeSingleMovie: (state)=>{
    //   state.singleMovie = {};
    // }
  },
  extraReducers: {
   
    [fetchAsyncNotes.fulfilled]: (state, { payload }) => {
      console.log("Fetched notes Successful");
      return { ...state, notes: payload };
    },

    [fetchAsyncSavedNotes.fulfilled]: (state, { payload }) => {
      console.log("Fetched saved notes Successful");
      return { ...state, savednotes: payload };
    },
 
    [fetchAsyncCreatedNotes.fulfilled]: (state, { payload }) => {
      console.log("Fetched created notes Successful");
      return { ...state, creatednotes: payload };
    },
   
    [fetchAsyncGetuserById.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successful for user");
      return { ...state, user: payload };
    },
   
  },
});

// export const { removeSingleMovie } = movieSlice.actions;
export const getAllNotes = (state) => state.notes.notes;
export const getAllSavedNotes = (state) => state.notes.savednotes;
export const getAllCreatedNotes = (state) => state.notes.creatednotes;
export const getUserById = (state) => state.notes.user;
export default notesSlice.reducer;

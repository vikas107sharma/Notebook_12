import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './NotesSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
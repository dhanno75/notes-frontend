import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import NoteSlice from "./features/NoteSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    notes: NoteSlice,
  },
});

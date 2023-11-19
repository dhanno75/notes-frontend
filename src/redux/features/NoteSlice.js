import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";
import axios from "axios";

export const getAllNotes = createAsyncThunk("note/getAllNotes", async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const { data } = await axios.get(`${API}/notes`, config);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const { data } = await axios.post(`${API}/notes`, config, values);
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const NoteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    notesInfo: null,
    error: null,
    success: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.notes = payload.data;
      })
      .addCase(getAllNotes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.notes = payload.data;
      })
      .addCase(addNote.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSomeState } = NoteSlice.actions;
export default NoteSlice.reducer;

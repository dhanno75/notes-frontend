import { SlOptionsVertical } from "react-icons/sl";
import "./styled_components/notes.css";
import { ColorPicker, Popover } from "antd";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { API } from "../globals";
import { useDispatch } from "react-redux";
import { getAllNotes } from "../redux/features/NoteSlice";
import { useState } from "react";
// Material UI
// import DialogContentText from "@mui/material/DialogContentText";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Button,
} from "@mui/material";

const Notes = ({ notes }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    dispatch(getAllNotes());
  };

  const setNodeData = (note) => {
    localStorage.setItem("noteId", note._id);
    setTitle(note.title);
    setText(note.text);
    setColor(note.color);
    setImage(note.image);
  };

  const handleEdit = async (id) => {
    const res = await fetch(`${API}/notes/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, text, color, image }),
    });
    await res.json();
    dispatch(getAllNotes());
  };

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note._id}
          className="note"
          style={{ backgroundColor: note.color }}
        >
          {/* <div className="note-wrapper"> */}
          <div className="notes-details">
            <div className="title">{note.title}</div>
            <div className="text">{note.text}</div>
            <div className="img">{note.image}</div>
          </div>
          <Popover
            content={
              <div className="pop">
                <ul>
                  <li
                    onClick={() => {
                      handleClickOpen();
                      setNodeData(note);
                    }}
                  >
                    <HiPencil /> <span> Edit</span>
                  </li>
                  {note._id === localStorage.getItem("noteId") ? (
                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Edit your note"}
                      </DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Title"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          name="title"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Text"
                          type="text"
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                          name="text"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          id="standard-basic"
                          margin="dense"
                          label="Color"
                          variant="standard"
                          fullWidth
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleClose();
                            handleEdit(note._id);
                          }}
                          autoFocus
                        >
                          Edit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  ) : (
                    ""
                  )}
                  <li onClick={() => handleDelete(note._id)}>
                    <HiTrash /> <span> Delete</span>
                  </li>
                </ul>
              </div>
            }
          >
            <SlOptionsVertical className="notes-icon" />
          </Popover>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default Notes;

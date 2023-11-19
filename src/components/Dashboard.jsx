import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../redux/features/NoteSlice";
import "./styled_components/dashboard.css";
import { ColorPicker } from "antd";
import { BiSolidSend } from "react-icons/bi";
import { RevolvingDot } from "react-loader-spinner";
import Notes from "./Notes";
import { API } from "../globals";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  let [form, setForm] = useState({ title: "", text: "" });
  const imgRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      ...form,
      image,
      color,
    };
    await fetch(`${API}/notes`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setForm({ title: "", text: "" });
    setImage("");
    setColor("");
    dispatch(getAllNotes());
  };

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="notes-form">
          <p>Take a note</p>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />
            <input
              type="text"
              name="text"
              placeholder="Text"
              onChange={handleChange}
            />
            <div className="fileUpload">
              <input
                type="file"
                className="upload"
                ref={imgRef}
                name="img"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <span>Add image</span>
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              <BiSolidSend style={{ color: "#fff" }} />
            </button>
          </form>
          <div className="img-colors">
            <ColorPicker
              showText={(color) => (
                <span>Choose color ({color.toHexString()})</span>
              )}
              onChange={(value) => setColor(value.toHexString())}
            />
          </div>
        </div>
        <div className="notes">
          {notes ? (
            <Notes notes={notes} />
          ) : (
            <RevolvingDot
              radius="45"
              strokeWidth="5"
              color="red"
              secondaryColor="green"
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

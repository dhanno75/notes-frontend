import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import VerifiedViewPage from "./components/VerifiedViewPage";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/verify/:userId/:verificationToken"
          element={<VerifiedViewPage />}
        />
      </Routes>
    </>
  );
}

export default App;

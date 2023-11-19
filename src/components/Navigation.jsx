import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

const Navigation = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    toast.warn("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Container isLoggedIn={isLoggedIn}>
      <div className="left">
        <Link to="/">
          <p className="logo">Notes</p>
        </Link>
        <div className="input-icon">
          <input type="text" placeholder="Search" />
          {/* <Link to="/mainBoard">Tasks</Link> */}
        </div>
      </div>

      <div className="right">
        {isLoggedIn ? <p>Hi, {name}</p> : <Link to="/signup">Sign Up</Link>}
        {isLoggedIn ? (
          <FiLogOut onClick={handleLogout} />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  height: 70px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #feb14d;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    p {
      text-transform: uppercase;
      font-size: 27px;
      font-family: Raleway, "sans-serif";
      font-weight: 300;
      letter-spacing: 1px;
      margin: 0;
      color: #fff;
    }

    .input-icon {
      display: flex;
      align-items: flex-end;
      margin-bottom: 0px;

      input {
        padding: 6px 10px;
        border: none;
        border-radius: 5px;
        transition: all 0.3s;

        &:focus {
          outline: none;
          padding: 8px 35px;
          padding-left: 10px;
        }
      }
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 10%; */
    width: ${({ isLoggedIn }) => (isLoggedIn ? "12%" : "10%")};
    margin-right: 12px;

    p {
      font-size: 18px;
      height: 100%;
      margin-bottom: 0;
      color: #7b691c;
    }

    svg {
      background: transparent;
      font-size: 22px;
      color: #7b691c;
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
    font-size: 18px;
    color: #7b691c;
    /* padding: 10px; */
    height: 100%;
    transition: all 0.3s;
  }
`;

export default Navigation;

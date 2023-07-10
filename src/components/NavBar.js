import {
  Button,
  Container,
  Form,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import ButtonComponent from "./ButtonComponent";
import classes from "../styles/Buttons.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar({ onData }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data.user;
          setUserData(user);
          onData(user);
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderProfileTooltip = (props) => (
    <Tooltip id="profile-tooltip" {...props}>
      Profile
    </Tooltip>
  );

  const renderLogoutTooltip = (props) => (
    <Tooltip id="logout-tooltip" {...props}>
      Log Out
    </Tooltip>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Navbar.Text>
            <Link className={classes.NavbarText} to="/">
              <h2>Home</h2>
            </Link>
          </Navbar.Text>
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              className="me-2 d-flex align-items-center"
              variant="outline-success"
            >
              Search <HiOutlineSearch className="ms-2" />
            </Button>
          </Form>

          {userData.role === "regular" || userData.role === "admin" ? (
            <div className="d-flex align-items-center">
              <span className="me-2">
                <b>{userData.name}</b> signed in as a <b>{userData.role}</b>{" "}
                user
              </span>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 200 }}
                overlay={renderProfileTooltip}
              >
                <Link to="/dashboard">
                  <Button className="me-2" variant="outline-info">
                    <BsPersonCircle />
                  </Button>
                </Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 200 }}
                overlay={renderLogoutTooltip}
              >
                <Button onClick={logoutHandler} variant="outline-danger">
                  <HiOutlineLogout />
                </Button>
              </OverlayTrigger>
            </div>
          ) : (
            <div className={classes.buttonContainer}>
              <ButtonComponent
                link="/login"
                variant="outline-primary"
                text="Login"
              />
              <ButtonComponent
                link="/register"
                variant="outline-success"
                text="Sign In"
              />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

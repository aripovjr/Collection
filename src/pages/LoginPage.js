import React, { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import classes from "../styles/Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import style from "../styles/App.module.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/login", data);

      if (response.status === 200) {
        // User login successful
        navigate("/");
      }
      const token = response.data.token;

      localStorage.setItem("token", token);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          // Invalid email or password
          setErrorMessage(data.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      } else {
        // Handle other errors or display a generic error message
        setErrorMessage("An error occurred. Please try again later.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  const handleCloseToast = () => {
    setErrorMessage("");
  };

  return (
    <div className={style.App}>
      <Form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.Form}
        action="POST"
        method="POST"
      >
        <h1>Log In</h1>

        <Toast
          show={!!errorMessage}
          onClose={handleCloseToast}
          className="position-fixed top-0 end-2 "
        >
          <Toast.Header className="bg-primary">
            <strong className="me-auto text-white ">Something is wrong</strong>{" "}
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <span className="text-danger">Please enter a valid email</span>
          )}
          <br />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-danger">
              Password must be at least 6 characters long
            </span>
          )}
        </Form.Group>
        <h6>
          <Link to="/register">Don't have an account?</Link>
        </h6>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;

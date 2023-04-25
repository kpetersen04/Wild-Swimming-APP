import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import SignIn from "../pages/SignIn";
import { DEV_API_URL } from "../consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const SignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${DEV_API_URL}/auth/login/`,
        signInForm
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={SignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={onChange}
          name="email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={onChange}
          name="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default SignInForm;

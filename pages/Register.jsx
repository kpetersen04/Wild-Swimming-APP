import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
  });
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    console.log(registerFormData);
    console.log("Submit button clicked.");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${DEV_API_URL}/auth/register/`,
        registerFormData
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      // setShowError(true);
      // setError(err.response.statusText);
    }
  };
  return (
    <div>
      <h1>This is the register page.</h1>
      {/* {showError && <h3>{error}</h3>} */}
      <RegisterForm onSubmit={onSubmit} onChange={onChange} />
    </div>
  );
};

export default Register;

import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import axios from "axios";
import { DEV_API_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import Waterfall from "../assets/Waterfall.jpg";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    profile_photo: "",
  });
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "de7f0or8o",
      uploadPreset: "ws_profile_photos",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done, here is the image info: ", result.info);
        const { url } = result.info;
        setImageURL(url);
        console.log(url);
        setRegisterFormData({
          ...registerFormData,
          profile_photo: url,
        });
      }
    }
  );

  const uploadPhoto = (e) => {
    myWidget.open();
  };

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
      if (response) {
        navigate(`/sign-in/`);
      }
    } catch (err) {
      console.log(err);
      // setShowError(true);
      // setError(err.response.statusText);
    }
  };
  return (
    <div className=" register-page form-page">
      {/* {showError && <h3>{error}</h3>} */}
      {/* <img className="waterfall_image" src={Waterfall}></img> */}
      <div className="register_form_container">
        <RegisterForm
          onSubmit={onSubmit}
          onChange={onChange}
          uploadPhoto={uploadPhoto}
          myWidget={myWidget}
        />
      </div>
    </div>
  );
};

export default Register;

import { Component } from "react";
import SignInForm from "../components/SignInForm";
import ClearWater from "../assests/ClearWater.jpg";

const SignIn = () => {
  return (
    <div className="form_page">
      <img className="clearWater_image" src={ClearWater}></img>
      <SignInForm />
    </div>
  );
};

export default SignIn;

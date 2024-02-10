import React, { useState, useEffect } from "react";
import "./css/dark.css";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/progress/circular-progress.js";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import AnimatedPage from "./AnimatedPage";
import { doc } from "firebase/firestore/lite";
import { motion } from "framer-motion";
import Otp from "./Otp";

const Login = () => {
  const [isVisible, setIsVisible] = useState(true);

  const requestOTP = (e) => {
    e.preventDefault();

    setIsVisible(!isVisible);
    const phone = document.getElementById("phone").value;
    console.log(phone);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      }
    );
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP sent");
        console.log(confirmationResult);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  return (
    <AnimatedPage>
      <div className="container-fluid">
        <div className="row justify-content-around mt-5">
          <div className="d-flex col-md-6 justify-content-center">
            <md-outlined-text-field
              style={{
                opacity: isVisible ? 1 : 0,
                display: isVisible ? "" : "none",
                margin: "0 1rem",
              }}
              label="Phone Number"
              type="tel"
              id="phone"
              //   onChange={handleChange}
            ></md-outlined-text-field>
            <md-filled-tonal-button
              style={{
                opacity: isVisible ? 1 : 0,
                display: isVisible ? "" : "none",
              }}
              trailing-icon
              onClick={requestOTP}
            >
              Send OTP
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                slot="icon"
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </md-filled-tonal-button>
          </div>
          <div id="recaptcha-container"></div>
        </div>
        <Otp visibility={isVisible} />
      </div>
    </AnimatedPage>
  );
};

export default Login;

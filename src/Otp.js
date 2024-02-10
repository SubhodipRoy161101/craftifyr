import { progress } from "framer-motion";
import React, { useEffect, useState } from "react";
import "@material/web/progress/circular-progress.js";

import { useNavigate } from "react-router-dom";

const Otp = (props) => {
  const [progress, setProgress] = useState({
    progress: false,
    alerts: false,
  });

  const showAlert = () => {
    console.log("Showing Alert");
    setProgress({
      progress: false,
      alerts: true,
    }); // Show the alert box
    // console.log("Showing Alert box", progress.alerts);
    setTimeout(() => {
      setProgress({
        progress: false,
        alerts: false,
      });
      // console.log("hiding alert box", progress.alerts); // Hide the alert box after 2 seconds
    }, 2000);
  };
  const [otp, setOTP] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const naviagte = useNavigate();
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      const checkOTP = () => {
        if (otp.length === 6) {
          console.log(otp);
          let verifier = window.confirmationResult;
          verifier
            .confirm(otp)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              console.log(user);
              localStorage.setItem("user", JSON.stringify(user));
              naviagte("/route-decider");
            })
            .catch((error) => {
              // User couldn't sign in (bad verification code?)
              // ...
              showAlert();
              console.log(error);
            });
          // Call showAlert function wherever you want to show the alert box
          // For example:
        } else {
          console.log("In else block");
          showAlert();
        }
      };
      if (otp.length === 6) {
        checkOTP();
      } else {
        console.log("In else block");
        showAlert();
      }
    }
  }, [otp]);

  const handleOTPChange = (e) => {
    // console.log(progress.progress);
    setProgress({
      progress: true,
      alerts: false,
    });

    setOTP(document.getElementById("otp").value);
  };

  // console.log(otp);
  // console.log("Current Progress Value", progress.progress);
  console.log("Showing Alert box", progress.alerts);
  // console.log("Hiding progress", progress.progress);
  return (
    <>
      <div className="row">
        <div className="d-flex col-md-6 jsutify-content-center">
          <md-outlined-text-field
            label="Enter OTP"
            id="otp"
            type="number"
            style={{
              display: !props.visibility ? "" : "none",
              margin: "0 1rem",
            }}
          />
          <md-filled-tonal-button
            onClick={handleOTPChange}
            trailing-icon
            style={{ display: !props.visibility ? "" : "none" }}
          >
            Verify OTP
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              slot="icon"
            >
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </md-filled-tonal-button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 justify-content-center d-flex mt-2">
          <md-circular-progress
            indeterminate
            style={{ display: progress.progress ? "block" : "none" }}
          ></md-circular-progress>
          <div
            className="alert alert-danger"
            role="alert"
            style={{ display: progress.alerts ? "block" : "none" }}
          >
            Invalid OTP
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;

import React, { useState } from "react";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/textfield/filled-text-field.js";
import logo from "../icon/home_pin_FILL0_wght400_GRAD0_opsz24.svg";
import HomePin from "../icon/react-svg-icon/HomePin";
import { OutlinedTextField } from "../library/OutlinedTextField";
import { db } from "../firebase";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

const DetailsForm = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});

  const phone = JSON.parse(localStorage.getItem("user")).phoneNumber;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const addDetails = async () => {
    try {
      const addrRef = doc(db, "user", phone, "address", "default");
      const addrSnap = await getDoc(addrRef);
      console.log(addrSnap.data());
      if (!addrSnap.exists()) {
        // Document exists, update it
        await setDoc(addrRef, details);
        console.log("Document updated");
      } else {
        // Document does not exist, create a new one
        const docRef = await setDoc(
          collection(db, "product", phone, "address"),
          details
        );
        console.log("Document written with ID: ", docRef.id);
      }

      // navigate("/addresses");
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  console.log(details);

  return (
    <AnimatedPage>
      <div className="container" style={{ maxWidth: "600.5px" }}>
        <div className="row jsutify-content-center mt-5 form-bg p-5">
          <div className="d-flex col-md-6 justify-content-end">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="First Name"
              id="first_name"
              type="text"
              required
              name="first_name"
              onChange={handleChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                slot="leading-icon"
              >
                <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
              </svg>
            </OutlinedTextField>
          </div>
          <div className="d-flex col-md-6 jsutify-content-start">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="Last Name"
              id="last_name"
              type="text"
              required
              name="last_name"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex col-12 justify-content-end mt-2">
            <OutlinedTextField
              style={{ resize: "vertical", width: "100%" }}
              type="textarea"
              label="Address"
              rows="3"
              required
              name="address"
              onChange={handleChange}
            >
              <HomePin slot="leading-icon"></HomePin>
            </OutlinedTextField>
          </div>
          <div className="d-flex col-md-6 jsutify-content-start mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="City"
              type="text"
              name="city"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex col-md-6 jsutify-content-start mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="State"
              type="text"
              name="state"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex col-md-6 jsutify-content-start mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="Country"
              type="text"
              name="country"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex col-md-6 jsutify-content-start mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="Pin Code"
              type="text"
              onChange={handleChange}
              name="pincode"
            />
          </div>
          <div className="d-flex col-12 justify-content-start mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              name="email"
              label="Email"
              pattern="[\w\d-]+"
              suffix-text="@gmail.com"
              onChange={handleChange}
            ></OutlinedTextField>
          </div>
          <div className="col-md-6 d-flex jsutify-content-center mt-2">
            <OutlinedTextField
              style={{ width: "100%" }}
              label="Adress Nickname"
              type="text"
              id="addr_nick"
              name="addr_nick"
              onChange={handleChange}
            ></OutlinedTextField>
          </div>
          <div className="col-6 d-flex jsutify-content-center mt-2"></div>
          <div className="col-6 d-flex justify-content-end mt-2">
            <md-filled-tonal-button
              // style={{
              //   opacity: isVisible ? 1 : 0,
              //   display: isVisible ? "" : "none",
              // }}
              style={{ minHeight: "3.5rem" }}
              trailing-icon
              onClick={addDetails}
            >
              Submit
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
        </div>
      </div>
    </AnimatedPage>
  );
};

export default DetailsForm;

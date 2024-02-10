import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";

import "@material/web/button/filled-tonal-button.js";

// import { getDoc, doc, collection } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import "@material/web/icon/icon.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/tabs/primary-tab.js";
import "@material/web/tabs/secondary-tab.js";
import "@material/web/tabs/tabs.js";
import HomePin from "../icon/react-svg-icon/HomePin";
import AnimatedPage from "../AnimatedPage";

const Adresses = () => {
  const phone = JSON.parse(localStorage.getItem("user")).phoneNumber;

  const [addresses, setAddresses] = useState({});
  const [selectedTab, setSelectedTab] = useState(Object.keys(addresses)[0]);

  useEffect(() => {
    const getAddresses = async () => {
      console.log(phone);
      const collRef = collection(db, "user", phone, "address");
      const docSnap = await getDocs(collRef);
      console.log(docSnap);
      docSnap.forEach((doc) => {
        console.log("Document ID: ", doc.id);
        console.log("Data: ", doc.data());
        setAddresses((prev) => ({
          ...prev,
          [doc.id]: doc.data(),
        }));
      });
    };
    getAddresses();
  }, [phone]);

  useEffect(() => {
    // Check if addresses have been loaded and if selectedTab is not set
    if (Object.keys(addresses).length > 0 && !selectedTab) {
      // Set selectedTab to the first tab
      setSelectedTab(Object.keys(addresses)[0]);
    }
  }, [addresses, selectedTab]);

  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
  };

  console.log(selectedTab);
  console.log(addresses);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex col-12 justify-content-center p-4">
          <md-tabs class="scrolling">
            {Object.keys(addresses).map((key) => (
              <md-primary-tab
                key={key}
                id={key}
                onClick={(e) => {
                  handleTabChange(key);
                }}
              >
                <HomePin slot="icon" />{" "}
                {addresses[key].addr_nick
                  ? addresses[key].addr_nick
                  : "Unnamed"}
              </md-primary-tab>
            ))}
          </md-tabs>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <AnimatedPage key={selectedTab}>
          <div className="row justify-content-center">
            <div className="col-md-10 p-4">
              <div className="address-details">
                {selectedTab && addresses[selectedTab] && (
                  <div>
                    <h2>{addresses[selectedTab].address}</h2>
                    <p>{addresses[selectedTab].city}</p>
                    <p>{addresses[selectedTab].state}</p>
                    <p>{addresses[selectedTab].country}</p>
                    <p>{addresses[selectedTab].pincode}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6"></div>
            <div className="col-6">
              <md-filled-tonal-button
                // style={{
                //   opacity: isVisible ? 1 : 0,
                //   display: isVisible ? "" : "none",
                // }}
                style={{ minHeight: "3.5rem" }}
                trailing-icon
                //   onClick={addDetails}
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
        </AnimatedPage>
      </AnimatePresence>
    </div>
  );
};

export default Adresses;

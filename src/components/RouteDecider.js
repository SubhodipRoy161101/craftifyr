import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const RouteDecider = () => {
  const naviagte = useNavigate();
  const checkIfDocumentExists = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);

    try {
      const docSnapshot = await getDoc(docRef);
      return docSnapshot.exists();
    } catch (error) {
      console.error("Error checking document existence:", error);
      return false;
    }
  };

  const checkDocument = async () => {
    const collectionName = "user";
    const documentId = JSON.parse(localStorage.getItem("user")).phoneNumber;
    console.log(collectionName, documentId);

    const documentExists = await checkIfDocumentExists(
      collectionName,
      documentId
    );

    if (documentExists) {
      console.log("Document exists!");
    } else {
      console.log("Document does not exist!");
      naviagte("/details-page");
    }
  };

  checkDocument();

  return <div>RouteDecider</div>;
};

export default RouteDecider;

import React, { useState } from "react";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AllProducts = () => {
  const [urls, setUrls] = useState([]);

  const getProductData = async (props) => {
    const collectionName = "products";
    const documentId = props ? props.category : "category1";
    console.log(collectionName, documentId);

    const checkIfDocumentExists = async (collectionName, documentId) => {
      const collRef = collection(db, collectionName, documentId, "item");

      try {
        const docSnapshot = await getDocs(collRef);
        console.log(docSnapshot);
        docSnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error checking document existence:", error);
        return false;
      }
    };

    const documentExists = await checkIfDocumentExists(
      collectionName,
      documentId
    );

    console.log(documentExists);
  };

  getProductData();
  return <div>AllProducts</div>;
};

export default AllProducts;

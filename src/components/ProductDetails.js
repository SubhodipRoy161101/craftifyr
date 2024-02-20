import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Carousel from "../library/Carousel";

const ProductDetails = () => {
  return (
    <div className="container">
      <div className="row jsutify-content-center">
        <div className="col-md-6">
          <Carousel urls={urls ? urls : []} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
  const initial_product_details = {
    productName: "",
    sku: "",
    units: "",
    discount: "",
    mrp: "",
    tax: "",
    hsn: "",
  };
  const [productDetails, setProductDetails] = useState(initial_product_details);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const category = "category1";
    const docRef = await addDoc(
      collection(db, "products", category, "item"),
      productDetails
    );
    console.log("Document written with ID: ", docRef.id);

    // Upload images to Firebase Storage
    const imageFiles = document.getElementById("image").files;
    const imageUrls = [];
    if (imageFiles.length !== 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const imageRef = ref(
          storage,
          `products/${category}/${docRef.id}/${imageFile.name}`
        );
        await uploadBytesResumable(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
        console.log(imageUrls);
      }
    }
    // Add image URLs to Firestore
    const productRef = doc(db, "products", category, "item", docRef.id);
    await updateDoc(productRef, { images: imageUrls });

    // Reset form fields

    setProductDetails(initial_product_details);

    // Reset other form fields
  };

  const handleProductDetailsChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                onChange={handleProductDetailsChange}
                name="productName"
                value={productDetails.productName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">SKU</label>
              <input
                type="text"
                className="form-control"
                name="sku"
                onChange={handleProductDetailsChange}
                value={productDetails.sku}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Units</label>
              <input
                type="text"
                className="form-control"
                name="units"
                onChange={handleProductDetailsChange}
                value={productDetails.units}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productName">Discount</label>
              <input
                type="text"
                className="form-control"
                name="discount"
                onChange={handleProductDetailsChange}
                value={productDetails.discount}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productName">MRP</label>
              <input
                type="text"
                className="form-control"
                name="mrp"
                onChange={handleProductDetailsChange}
                value={productDetails.mrp}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Tax</label>
              <input
                type="text"
                className="form-control"
                name="tax"
                onChange={handleProductDetailsChange}
                value={productDetails.tax}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">HSN</label>
              <input
                type="text"
                className="form-control"
                name="hsn"
                onChange={handleProductDetailsChange}
                value={productDetails.hsn}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept=".jpg, .png, .jpeg"
                multiple
                name="image"
                value={productDetails.image}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

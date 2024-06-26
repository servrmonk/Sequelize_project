import React, { useEffect } from "react";
import axios from "axios";

export default function ShowProducts() {
  // const [products,setProducts] = useState([])

  useEffect(() => {
    console.log("inside the useeffect");
    const getProductsData = async () => {
      try {
        // http://localhost:8080/api/products/allProducts
        const {data} = await axios.get("/api/products/allProducts");
        console.log("data=>>>", data);
      } catch (err) {
        console.log("Error in showProduct is ", err);
      }
    };
    
    getProductsData();
  }, []);

  return (
    <>
      <h1>All Product</h1>
    </>
  );
}

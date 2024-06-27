import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
export default function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("inside the useeffect");
    const getProductsData = async () => {
      try {
        // http://localhost:8080/api/products/allProducts
        const { data } = await axios.get("/api/products/allProducts");
        console.log("data=>>>", data);
        setProducts(data);
      } catch (err) {
        console.log("Error in showProduct is ", err);
      }
    };

    getProductsData();
  }, []);

  return (
    <>
      <Container className="justify-content-center  m-auto p-3 ">
        <h1 className="text-center text-lg">Show All Product</h1>
        <hr />

        <Row>
          {products.map((product) => {
            return (
              <Col md={6} lg={3} sm={12} key={product.id} className="mb-3 p-2">
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

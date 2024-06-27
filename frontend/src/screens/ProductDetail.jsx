import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
console.log("Id in useparams ",id);
  useEffect(() => {
    console.log("inside the useeffect");

    const getSingleProductsData = async () => {
      try {
        
        const { data } = await axios.get(`/api/products/${id}`);
        console.log("data in product details ", data);
        setProduct(data);
      } catch (err) {
        console.log("Error in showProduct is ", err);
      }
    };

    getSingleProductsData();
  }, [id]);

  return (
    <>
      
      <Container className="justify-content-center  m-auto p-3 ">
        <h1 className="text-center text-lg">ProductDetail page</h1>
        <hr />
      <Card className="shadow-lg m-2 p-3 rounded" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Title: {product.title}</Card.Title>
          <Card.Title>Price: ${product.price}</Card.Title>
          <Card.Text><strong>Description: </strong>{product.description}</Card.Text>
          <Link to={`/product/edit/${id}`}>
            <Button className="m-2">Edit</Button>
          </Link>
          <Link to={`/product/${id}`}>
            <Button className="m-2">Delete</Button>
          </Link>
        </Card.Body>
      </Card>
      </Container>
    </>
  );
}

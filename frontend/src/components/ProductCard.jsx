import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log("Product in product card ", product);
  return (
    <>
      <Card className="shadow-lg m-2 p-3 rounded" style={{ width: "18rem" }}>
        <Card.Img src={product.image} alt="No image available" />
        <Card.Body>
          <Card.Title>Title: {product.title}</Card.Title>
          <Card.Title>Price: ${product.price}</Card.Title>
          <Card.Text>
            <strong> Description: </strong>
            {product.description}
          </Card.Text>
          <Link to={`/product/${product.id}`}>
            <Button>Detail</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

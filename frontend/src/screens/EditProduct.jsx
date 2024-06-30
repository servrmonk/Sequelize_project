import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate  = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
    };
    getDataById();
  }, [id]);
  const updateHandler =async (e) => {
    e.preventDefault();
    // Update by put request
    const data = { title:title,price:price,description:description,published:true };
    await axios.put(`/api/products/${id}`,data)

    navigate('/products')

  };
  return (
    <>
      <Container className="mt-5 p-2">
        <h1>Edit Product Page</h1>

        <hr />
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
}

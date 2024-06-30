import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState('')

  const addProductHandler = async (e) => {
    e.preventDefault();
    // const data = {
    //   title: title,
    //   price: price,
    //   description: description,
    //   published: true,
    // };

    const formData = new FormData();
    formData.append('image',productImage)
    formData.append('title',title)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('published',true)

    try {
      const resp = await axios.post(`/api/products/addProduct`, formData);
      console.log(resp);
    } catch (err) {
      console.log("Error in sending the data");
    }
    navigate("/products");
  };

  return (
    <>
      <Container className="mt-5 p-2">
        <h1>Add Product</h1>
        <hr />
        {/* multipart form data because we are passing all the info with the form data */}
        <Form onSubmit={addProductHandler} method="POST" encType="multipart/form-data"> 

          <Form.Group className="mb-3" controlId="fileName">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name='image'
              size="lg"
              onChange={e => setProductImage(e.target.files[0])} //if u directly pass files than it will take multiple files 
            />
          </Form.Group>
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

export default AddProduct;

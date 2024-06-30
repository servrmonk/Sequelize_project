import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  // For adding Reviews
  const [review, setReview] = useState([]); //reviews are array
  const [reviewDescription, setReviewDescription] = useState("");

  //rating and descripting for form to add rating
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  console.log("Id in useparams ", id);

  useEffect(() => {
    console.log("inside the useeffect");

    const getSingleProductsData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/getProductReviews/${id}`
        );
        console.log("data in product details ", data);
        setProduct(data);
        setReview(data.review);
      } catch (err) {
        console.log("Error in showProduct is ", err);
      }
    };

    getSingleProductsData();
  }, [id]);

  //Handling delete
  const handleDelete = async () => {
    await axios.delete(`/api/products/${id}`);
    navigate("/products");
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    let review = {
      product_id: id,
      rating: rating,
      description: reviewDescription,
    };
    await axios.post(`/api/products/addReview/${id}`, review);
    navigate("/products");
  };

  return (
    <>
      <Container className="justify-content-center  m-auto p-3 ">
        <h1 className="text-center text-lg">ProductDetail page</h1>
        <hr />
        <Card className="shadow-lg m-2 p-3 rounded" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Title: {product.title}</Card.Title>
            <Card.Title>Price: ${product.price}</Card.Title>
            <Card.Text>
              <strong>Description: </strong>
              {product.description}
            </Card.Text>

            <hr />
            <h4>Reviews:</h4>
            {review.length > 0 &&
              review.map((rev) => {
                return (
                  <p key={rev.id}>
                    <i> Rating</i>:{rev.rating} <br /> <i> Description</i>:{" "}
                    {rev.description}{" "}
                  </p>
                );
              })}
            <hr />

            <Link to={`/product/edit/${id}`}>
              <Button className="m-2 btn-success ">Edit</Button>
            </Link>
            <Link to={`/product/${id}`}>
              <Button
                className="m-2 btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <h2>Add Review</h2>
        <br />
        <Form onSubmit={addReviewHandler}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              type="number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              as="textarea"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Review
          </Button>
        </Form>
      </Container>
    </>
  );
}

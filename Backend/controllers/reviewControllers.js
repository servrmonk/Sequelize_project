const db = require("../models");

const Review = db.reviews; //coming from model index.js

/* Functions */

/* 1. Add Review */
const addReview = async (req, res) => {
  console.log("inside addreview");
  try {
    let data = {
      rating: req.body.rating,
      description: req.body.description,
    };

    const review = await Review.create(data);
    res.status(201).send(review);
  } catch (err) {
    res.status(500).send({ message: "Unable to create the review" });
    console.log("Error in creating the review", err);
  }
};

/* 2. Get All Review */
const getAllReviews = async (req, res) => {
  
  try {
    const allreview = await Review.findAll({});
    res.status(200).send(allreview);
    
    // console.log("review in getallreview ==>", allreview);
  } catch (err) {
    res.status(500).send({ message: "Unable to get all  the reviews" });
    console.log("Error in getting the review", err);
  }
};

module.exports = { addReview, getAllReviews };

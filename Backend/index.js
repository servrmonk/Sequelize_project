const express = require("express");
const cors = require("cors");
const router = require("./router/productRouter");
const path = require('path');

const app = express();

/* MIDDLEWARE */
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* TESTING API */
app.get("/", (req, res) => {
  res.json({ message: "Hello from api" });
});

/* ROUTERS */
app.use("/api/products", router);

/* Static Images Folder */
// app.use('/Images',express.static('./Images'))
app.use('/Image', express.static(path.join(__dirname, 'Image')));



/* PORT */
const PORT = process.env.PORT || 8080;

/* SERVER */
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

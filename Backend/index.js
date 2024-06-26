const express = require("express");
const cors = require("cors");
const router = require("./router/productRouter");


const app = express();
var corOptions = {
  origin: "https://localhost:8001",
};

/* MIDDLEWARE */
app.use(cors(corOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* TESTING API */
app.get("/", (req, res) => {
  res.json({ message: "Hello from api" });
});

/* ROUTERS */
app.use("/api/products", router);

/* PORT */
const PORT = process.env.PORT || 8080;

/* SERVER */
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

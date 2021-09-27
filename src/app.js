const express = require("express");
const bodyParser = require("body-parser");

// Database import
const mongoose = require("mongoose");

// Required imports
const app = express();
const cors = require("cors");

// Models imports
const Product = require("./models/product");
const Category = require("./models/category");

// Routes imports
const indexRoutes = require("./routes");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// What the app is going to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // To allow access from other sources

// Connecting to the database through the URL from the db's site.
mongoose.connect(
  "mongodb+srv://myuser:mateus@cluster0.czgi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => console.log("Database connected")
);

// Telling the app about the routes
app.use("/", indexRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// Router error
app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;

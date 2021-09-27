const mongoose = require("mongoose"); // The db.
const Schema = mongoose.Schema; // Importing the schema to create a schema for the db.

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true, // Removes whitespace.
  },
});

module.exports = mongoose.model("Category", schema); // Exporting model

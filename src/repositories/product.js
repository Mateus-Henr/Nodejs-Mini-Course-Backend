const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// GET operation with arguments
exports.get = (
  condition,
  fields,
  limit = 10,
  page = 0,
  sort = "name",
  direction = "asc"
) => {
  return Product.find(condition, fields, { skip: limit * page, limit })
    .populate("category", "_id name label")
    .sort({ [sort]: direction === "desc" ? -1 : 1 })
    .exec();
};

exports.getById = (id, fields) => {
  return Product.findById(id, fields).populate("category", "_id name label");
};

exports.create = async (data) => {
  const product = new Product(data);
  await product.save();
};

exports.update = async (id, data, fields) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      ...data,
    },
  });
  return Product.findById(id, fields).populate("category", "_id name label");
};

exports.delete = (id) => {
  return Product.findByIdAndDelete(id);
};

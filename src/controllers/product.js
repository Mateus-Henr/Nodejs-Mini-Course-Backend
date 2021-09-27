const repository = require("../repositories/product");

const fields =
  "name _id description price category count_serves is_available is_on_sale image sale_price";

// Controller is responsible for the validation

const validateBody = (body) => {
  if (!body.description || body.description.length > 200) {
    throw new Error(
      "The product's description must be 200 characters at maximum."
    );
  }

  if (!body.price || body.price <= 0) {
    throw new Error("The product's price must be greater than 0.");
  }
};

exports.post = async (req, res) => {
  try {
    await repository.create(req.body);
    res
      .status(201)
      .send({ message: "The product has been created successfully." });
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The product hasn't been created.",
      data: e.message,
    });
  }
};

// GET operation that involves pagination and ordering.
exports.get = async (req, res) => {
  try {
    const condition = {};
    if (req.query.search) {
      condition.$or = [
        { name: { $regex: new RegExp(req.query.search, "i") } },
        { description: { $regex: new RegExp(req.query.search, "i") } },
      ];
    }
    if (req.params.category) {
      condition.category = req.params.category;
    }

    const products = await repository.get(
      condition,
      fields,
      parseInt(req.query.limit, 10) || 10, // Pagination
      parseInt(req.query.page, 10) || 0,
      req.query.sort, // Ordering
      req.query.direction
    );
    res.status(200).send(products);
  } catch (e) {
    res
      .status(400)
      .send({ message: "ERROR: Error during the search.", data: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await repository.getById(req.params.id, fields); // ID example: 537eed02ed345b2e039652d2
    if (!product) {
      return res
        .status(404)
        .send({ message: "ERROR: The product hasn't been found." });
    }
    return res.status(200).send(product);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "ERROR: Error during the search.", data: e.message });
  }
};

exports.put = async (req, res) => {
  try {
    const product = await repository.update(req.params.id, req.body, fields);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The product hasn't been updated.",
      data: e.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    res
      .status(200)
      .send({ message: "The product has been deleted successfully." });
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The product hasn't been deleted.",
      data: e.message,
    });
  }
};

const repository = require("../repositories/category"); // Importing the repository, since we need to modify things in there.

const fields = "name _id label"; // Defining the fields that are going to be use for us.

// req == request object
// res == response object
exports.post = async (req, res) => {
  try {
    await repository.create(req.body);
    res
      .status(201)
      .send({ message: "The category has been created successfully." });
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The category hasn't been created.",
      data: e.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const categories = await repository.getAll(fields);
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send({
      message: "ERROR: An error has happened during the search.",
      data: e.message,
    });
  }
};

exports.put = async (req, res) => {
  try {
    const category = await repository.update(req.params.id, req.body, fields);
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The category hasn't been updated.",
      data: e.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    res
      .status(200)
      .send({ message: "The category has been deleted successfully." });
  } catch (e) {
    res.status(400).send({
      message: "ERROR: The category hasn't been deleted.",
      data: e.message,
    });
  }
};

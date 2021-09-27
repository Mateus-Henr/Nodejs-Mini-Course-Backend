const app = require("../src/app"); // Importing the app to set it up´.
const http = require("http"); // Importing http to create the server.

// Function if there's an error when trying to initiate the server
const error = () => {
  console.log("An error has happened");
};

const port = 3000;
app.set("port", port);

// Configuring our server
const server = http.createServer(app);
server.listen(port, () => console.log(`App rodando na porta ${port}`));
server.on("error", error);

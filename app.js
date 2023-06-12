const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const usersHandlers = require("./usersHandlers");
const movieHandlers = require("./movieHandlers");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/users", usersHandlers.postUsers);
app.put("/api/users/:id", usersHandlers.updateUsers);

app.get("/api/movies", movieHandlers.getMovie);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
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

const { hashPassword, verifyPassword , verifyToken} = require("./auth.js");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.get("/api/movies", movieHandlers.getMovie);
app.post("/api/users", hashPassword, usersHandlers.postUsers);
app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken);

app.put("/api/users/:id", hashPassword, usersHandlers.updateUsers);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

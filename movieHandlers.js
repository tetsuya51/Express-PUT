const database = require("./database");

const postMovie = (req, res) => {
  res.send("Post route is working 🎉");
};

const getMovie = (req, res) => {
  res.send("Get route is working 🎉");
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);

  const { title, director, year, color, duration } = req.body;

  database

    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",

      [title, director, year, color, duration, id]
    )

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error editing the movie");
    });
};

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database

    .query("delete from movies where id = ?", [id])

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  getMovie,
  postMovie,
  updateMovie,
  deleteMovie,
};

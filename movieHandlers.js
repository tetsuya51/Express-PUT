const database = require("./database");

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).json({ insertId: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovie = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
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

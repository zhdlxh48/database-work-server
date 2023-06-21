const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: "svc.sel4.cloudtype.app",
  port: 30687,
  user: "testuser",
  password: "testepassword",
  database: "test-db",
});

router.get("/list", (req, res) => {
  console.log(req.body);
  db.query("SELECT * FROM players", (err, rows) => {
    if (err) {
      console.error(err);
      res
        .status(400)
        .send(JSON.stringify({ result: "FAIL", message: err.sqlMessage }));
      return;
    }

    console.log(rows);

    res.send(JSON.stringify({ result: "OK", message: rows }));
    return;
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  db.query(
    "SELECT * from players where player_email = ? and player_password = ?",
    [req.body.email, req.body.password],
    (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(400)
          .send(JSON.stringify({ result: "FAIL", message: err.sqlMessage }));
        return;
      }

      if (rows.length == 0) {
        res.status(400).send(
          JSON.stringify({
            result: "FAIL",
            message: "Invalid email or password",
          })
        );
        return;
      }

      console.log(rows);

      res.send(JSON.stringify({ result: "OK", message: rows }));
      return;
    }
  );
});

router.post("/register", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO players (player_name, player_email, player_password) VALUES (?, ?, ?)",
    [req.body.username, req.body.email, req.body.password],
    (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(400)
          .send(JSON.stringify({ result: "FAIL", message: err.sqlMessage }));
        return;
      }

      console.log(rows);

      res.send(JSON.stringify({ result: "OK", message: rows }));
      return;
    }
  );
});

module.exports = router;

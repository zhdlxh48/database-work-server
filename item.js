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

router.get("/", (req, res) => {
  console.log(req.query);
  db.query(
    "SELECT * FROM items where item_id = ?",
    [req.query.id],
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

router.get("/list", (req, res) => {
  db.query("SELECT * FROM items", (err, rows) => {
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

router.post("/", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO items (item_id, item_type, item_name) VALUES (?, ?, ?)",
    [req.body.item_id, req.body.item_type, req.body.item_name],
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

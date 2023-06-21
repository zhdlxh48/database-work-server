const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/item", require("./item"));
app.use("/api/player", require("./player"));
app.use("/api/inventory", require("./inventory"));

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

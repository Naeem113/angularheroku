const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/angularapp"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/angularapp/index.html"));
});

app.listen(process.env.PORT || 1200, () => {
  console.log(`listening`);
});

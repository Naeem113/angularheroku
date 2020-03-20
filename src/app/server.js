const exp = require("express");
const path = require("path");

const app = exp();
app.use(exp.static(_dirname + "/dist/AngularApp"));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname + "/dist/AngularApp/index.html"));
});

app.listen(process.env.PORT || 1200);

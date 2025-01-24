const { Router } = require("express");

const indexRouter = Router();


indexRouter.use("/", (req, res) => {
  if (!req.user) {
    res.render("log-in");
  } else {
    res.render("index");
  }
});


module.exports = indexRouter;

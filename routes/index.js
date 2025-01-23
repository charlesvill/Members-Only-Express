const { Router } = require("express");
const db = require("../db/queries.js");

const indexRouter = Router();


indexRouter.use("/", (req, res, next) => {
  if (!req.user) {
    res.render("log-in", {message: req.session.messages});
  } else {
    res.render("index");
  }
});


module.exports = indexRouter;

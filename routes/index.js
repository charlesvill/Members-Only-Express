const { Router } = require("express");

const indexRouter = Router();


indexRouter.use("/", (req, res, next) => {
  res.render("index");
});


module.exports = indexRouter;

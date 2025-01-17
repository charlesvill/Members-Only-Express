const { Router } = require("express");
const db = require("../db/queries.js");

const indexRouter = Router();


indexRouter.use("/", async(req, res, next) => {

  res.render("index");
});


module.exports = indexRouter;

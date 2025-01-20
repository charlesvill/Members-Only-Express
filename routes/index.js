const { Router } = require("express");
const db = require("../db/queries.js");

const indexRouter = Router();


indexRouter.use("/", async(req, res, next) => {

  if(!req.user){
    res.redirect("/log-in");
  }
  // look into passing messages when doing redirects
  res.render("index");
});


module.exports = indexRouter;

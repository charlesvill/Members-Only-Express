const { Router } = require("express");
const logInRouter = Router();
const passport = require("passport");


logInRouter.get("/", (req, res,) => {
  res.render("log-in"); 
});

function sanitizeFormInputs(req, res, next){

}

logInRouter.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect:"/log-in",
  failureFlash: true
}));

module.exports = logInRouter;

const { Router } = require("express");
const logInRouter = Router();
const passport = require("passport");
const { loginValidation } = require("../validation/validation.js");
const { validationResult } = require("express-validator");

function validateLogIn(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log("we have errors:", errors.array());
    return res.status(400).render("log-in", {
      formErrors: errors.array()
    });
  }

  next();
}

logInRouter.get("/", (req, res,) => {
  res.render("log-in");
});


logInRouter.post("/", [
  loginValidation,
  validateLogIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true
  })
]);

module.exports = logInRouter;


const { Router } = require("express");
const logInRouter = Router();
const passport = require("passport");


logInRouter.get("/", (req, res, next) => {
  res.render("log-in", {
    message: req.session.messages
  });
});

function sanitizeFormInputs(req, res, next){

}

logInRouter.post("/", passport.authenticate("local", {
  successredirect: "/",
  failureredirect:"/log-in",
  failuremessage: true
}));

module.exports = logInRouter;

const { Router } = require("express");
const logInRouter = Router();
const auth = require("../app.js");


logInRouter.get("/", (req, res, next) => {
  res.render("log-in");
});

function sanitizeFormInputs(req, res, next){

}

logInRouter.post("/", auth.passport.authenticate("local", {
  successredirect: "/",
  failureredirect:"/log-in",
  failuremessage: true
}));

module.exports = {
  logInRouter
};
// login router .post mw 
// pass req, res, next to sanitization
// pass to authorization mw
// redirect to index

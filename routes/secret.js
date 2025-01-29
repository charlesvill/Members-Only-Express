const { Router } = require("express");
const secretRouter = Router();
const { checkMembership } = require("../utils/utils.js");
const db = require("../db/queries.js");

secretRouter.get("/", (req, res) => {
  if(!req.user){
    return res.redirect("/log-in");
  }

  res.render("secret", {
    user: req.user
  });
});

secretRouter.post("/", async (req, res) => {
  const { secret } = req.body;
  // need to validate the inputs and sanitize

  const membership = checkMembership(secret);
  const id = req.user.id;

  // if admin true, -> both admin & member true
  // if only member true -> only member true
  if(membership.admin === true){
    await db.updateMembership(id, true, true);
  } else if (membership.member === true) {
    await db.updateMembership(id, true, false);
  }

  // should there be a message or indicator that they got it?
  res.redirect("/");
});

module.exports = secretRouter;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Router } = require("express");
const signUpRouter = Router();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");


signUpRouter.get("/", (req, res, next) => {
  res.render("sign-up");
});

signUpRouter.post("/", async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    password,
    confirmpass,
    secret
  } = req.body;

  try {
    if (password !== confirmpass) {
      req.flash('message', 'Passwords do not match!');
      res.redirect("/sign-up");
      return;
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const member = secret === process.env.MEMBER_SECRET
        || secret === process.env.ADMIN_SECRET;
      const admin = member && secret === process.env.ADMIN_SECRET;


      await db.insertNewUser(
        username,
        firstname,
        lastname,
        member,
        admin,
        hashedPassword
      );

      req.flash('message', 'User created successful! Please sign in');
      res.redirect("/log-in");
    });
  } catch (error) {

    return next(error);
  }
});

module.exports = signUpRouter;

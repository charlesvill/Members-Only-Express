const { Router } = require("express");
const signUpRouter = Router();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

require("dotenv").config();

signUpRouter.get("/", (req, res, next) => {
  console.log("sign up router should be used rn");
  res.render("sign-up", { message: req.session.messages });
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
      // req.session.messages = "Passwords do not match!";
      res.redirect("/sign-up");
      return;
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if(err) {
        return next(err);
      }

      const member = secret === process.env.MEMBER_SECRET
        || secret === process.env.ADMIN_SECRET;
      const admin = member && secret === process.env.ADMIN_SECRET;

      const query = `
      INSERT INTO users (
        username, firstname, lastname, membership, admin, hash
      )  VALUES ($1, $2, $3, $4, $5, $6)
      `
      await db.query(
        query,
        [
          username,
          firstname,
          lastname,
          member,
          admin,
          hashedPassword
        ]
      );

      // res.session.messages = "User Created Successful! Please Sign in";
      res.redirect("/log-in");

    });
  } catch (error) {

    return next(error);
  }
});

module.exports = signUpRouter;

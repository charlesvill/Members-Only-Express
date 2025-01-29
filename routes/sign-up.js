if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Router } = require("express");
const signUpRouter = Router();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { signupValidation } = require("../validation/validation.js");
const { validationResult } = require("express-validator");
const { checkMembership } = require("../utils/utils.js");

function validateSignupForm(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("we have errors in sign up", errors.array());
    return res.status(400).render("sign-up", {
      formErrors: errors.array()
    });
  }

  next();
}

signUpRouter.get("/", (req, res) => {
  res.render("sign-up");
});

signUpRouter.post("/", [
  signupValidation,
  validateSignupForm,
  async (req, res, next) => {
    const {
      firstname,
      lastname,
      username,
      password,
      secret
    } = req.body;

    try {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const membership = checkMembership(secret); 
        
    

        await db.insertNewUser(
          username,
          firstname,
          lastname,
          membership.member,
          membership.admin,
          hashedPassword
        );

        req.flash('message', 'User created successful! Please sign in');
        res.redirect("/log-in");
      });
    } catch (error) {

      return next(error);
    }
  }

]);

module.exports = signUpRouter;

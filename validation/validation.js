const { body } = require("express-validator");

const alphaErr = "must only contain letters!";
const lengthErr = "must be between 1 and 15 characters long";
const passLengthErr = "must be at least 8 characters long";
const passMatchErr = "passwords must match!";

const usernameValidator = body("username").trim().notEmpty().withMessage("Please enter your username").isAlpha().withMessage(alphaErr);
const passwordValidator = body("password")
  .trim()
  .notEmpty()
  .isLength({ min: 8 })
  .withMessage(passLengthErr);


const loginValidation = [
  usernameValidator,
  passwordValidator
];

const signupValidation = [
  body("firstname")
    .isLength({ min: 1, max: 15 })
    .withMessage(lengthErr)
    .trim()
    .isAlpha()
    .withMessage(alphaErr),
  body("lastname")
    .isLength({ min: 1, max: 15 })
    .withMessage(lengthErr)
    .trim()
    .isAlpha()
    .withMessage(alphaErr),
  body("username")
    .isLength({min: 1, max: 15})
    .withMessage(lengthErr)
    .trim()
    .isAlpha(),
  passwordValidator,
  body("confirmpass")
    .custom((value, { req }) => value === req.body.password)
    .withMessage(passMatchErr)
];

module.exports = {
  loginValidation,
  signupValidation
}

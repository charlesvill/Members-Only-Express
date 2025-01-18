const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index.js");
const session = require("express-session");
const auth = require("./authentication/passport.js");
// const logInRouter = require("./routes/log-in.js");
// const signUpRouter = require("./routes/sign-up.js");

const app = express();
const PORT = process.env.PORT || 3000;

//serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// enable .env variables
require('dotenv').config();

//set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
// passport initialization
app.use(auth.passport.session());
app.use(express.urlencoded({ extended: true }));

//define routes
app.use("/", indexRouter);
// app.use("/login", logInRouter);
// app.use("/signup", signUpRouter);
app.use((req, res, next) => {
  res.status(404).send("404: not found!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

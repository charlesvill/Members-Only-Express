if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport")
const flash = require("express-flash");

const indexRouter = require("./routes/index.js");
const signUpRouter = require("./routes/sign-up.js");
const logInRouter = require("./routes/log-in.js");
const addRouter = require("./routes/add.js");
const secretRouter = require("./routes/secret.js");
const db = require("./db/queries.js");



const app = express();
const PORT = process.env.PORT || 3000;


//serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

//import passport config and initialize
const initializePassport = require('./authentication/passport-config.js');
initializePassport(passport, db);

//set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());


app.use("/sign-up", signUpRouter);

app.use("/log-in", logInRouter);

app.use("/add", addRouter);

app.use("/secret", secretRouter);

app.use("/", indexRouter);

app.use((req, res, next) => {
  console.log("no route was found, ", req.params);
  res.status(404).send("404: not found!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


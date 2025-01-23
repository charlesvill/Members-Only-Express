const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/index.js");
const signUpRouter = require("./routes/sign-up.js");


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
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.selectUserbyUsername(username);
      const match = await bcrypt.compare(password, user.password);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);

    } catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = db.selectUserbyId(id);

    done(null, user.id);
  } catch (error) {
    done(error);
  }
});


app.use("/sign-up", signUpRouter);
app.use("/log-in", (req, res) =>{
  console.log("attempting to route to log in");
  res.send("this is the log-in route");
});
app.use("/", indexRouter);
app.use((req, res, next) => {
  res.status(404).send("404: not found!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


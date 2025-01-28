const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport, db) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.selectUserbyUsername(username);

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.hash);

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

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.selectUserbyId(id);
      console.log("we are in the deserializer!", user);


      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;

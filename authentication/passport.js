const passport = require("passport");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function passAuthenticator (username, password, done) {
  try {
    const user = await db.selectUserbyUsername(username);
    const match = await bcrypt.compare(password, user.password);

    if(!user){
      return done(null, false, { message: "Incorrect username" });
    }

    if(!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
    
  } catch (error) {
    return done(error);
  }
}

function serialize(user, done){
  done(null, user.id);
}

async function deserialize(id, done) {
  try {
    const user = await db.selectUserbyUsername(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
}

module.exports = {
  passport,
  passAuthenticator,
};

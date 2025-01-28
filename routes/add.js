const { Router } = require("express");
const db = require("../db/queries");

const addRouter = Router();

addRouter.get("/", (req, res) => {
  console.log("this is what req.user: ", req.user);
  if(!req.user){
    res.redirect("/log-in");
    return;
  } else {
    res.render("add", {
      user: req.user
    });
    return;
  }
});

addRouter.post("/", async (req, res) => {
  // need the text from the req.body
 // need id 
  // generate a time stamp
  // pass all info to db
  const { text } = req.body;
  const userid = req.user.id;

  await db.insertPost(userid, text);

  res.redirect("/");

  return;
});

module.exports = addRouter;


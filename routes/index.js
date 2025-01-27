const { Router } = require("express");
const db = require("../db/queries.js");

const indexRouter = Router();


indexRouter.use("/", async (req, res) => {
  if (!req.user) {
    res.render("log-in");
  } else {
    // pull all messages pass them through the object
    const messages = await db.selectAllMessages();
    res.render("index", {
      messages: messages
    });
  }
});


module.exports = indexRouter;

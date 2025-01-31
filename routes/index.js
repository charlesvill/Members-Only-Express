const { Router } = require("express");
const db = require("../db/queries.js");

const indexRouter = Router();


indexRouter.get("/", async (req, res) => {
  if (!req.user) {
    res.render("log-in");
  } else {
    // pull all messages pass them through the object
    const messages = await db.selectAllMessages();
    console.log("messages", messages);

    res.render("index", {
      user: req.user,
      messages: messages
    });
  }
});

indexRouter.post("/delete/:id", async (req, res) => {
  const postId = req.params.id;

  await db.deletePost(postId);

  res.redirect("/");
})


module.exports = indexRouter;

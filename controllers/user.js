const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/everyOne", async (req, res) => {
  try {
    const users = await User.find({});

    res.render("users/index.ejs", { users });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:username", async (req, res) => {
  try {
    const userName = await User.findOne({
      username: req.params.username,
    });
    res.render("users/show.ejs", { username: userName });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
module.exports = router;

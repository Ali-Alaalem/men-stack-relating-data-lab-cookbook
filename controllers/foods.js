const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const current = await User.findById(req.session.user._id);

    res.render("foods/index.ejs", {
      foods: current.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const current = await User.findById(req.session.user._id);

    current.pantry.push(req.body);

    await current.save();

    res.redirect(`/users/${current._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:foodId", async (req, res) => {
  try {
    const current = await User.findById(req.session.user._id);

    current.pantry.id(req.params.foodId).deleteOne();
    await current.save();
    res.redirect(`/users/${current._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:foodId/edit", async (req, res) => {
  try {
    const current = await User.findById(req.session.user._id);
    const food = current.pantry.id(req.params.foodId);
    res.render("foods/edit.ejs", {
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:foodId", async (req, res) => {
  try {
    const current = await User.findById(req.session.user._id);
    const food = current.pantry.id(req.params.foodId);

    food.set(req.body);

    await current.save();
    res.redirect(`/users/${current._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;

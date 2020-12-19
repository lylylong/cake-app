const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.render("loading", { loggedIn: true });
    return;
  }

  res.render("loading", { loggedIn: false });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;

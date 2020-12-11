const router = require("express").Router();
const sequelize = require("../config/connection");
const { Order, User, Comment, Vote } = require("../models");

// get all orders for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Order.findAll({
    attributes: [
      "id",
      "order_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE order.id = vote.order_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "order_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbOrderData) => {
      const orders = dbOrderData.map((order) => order.get({ plain: true }));

      res.render("homepage", {
        orders,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single order
router.get("/order/:id", (req, res) => {
  Order.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "order_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE order.id = vote.order_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "order_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbOrderData) => {
      if (!dbOrderData) {
        res.status(404).json({ message: "No order found with this id" });
        return;
      }

      const order = dbOrderData.get({ plain: true });

      res.render("single-order", {
        order,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

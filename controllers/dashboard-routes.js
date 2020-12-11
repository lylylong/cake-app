const router = require("express").Router();
const sequelize = require("../config/connection");
const { Order, User, Comment, Vote } = require("../models");
const withAuth = require("../utils/auth");

// get all orders for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Order.findAll({
    where: {
      user_id: req.session.user_id,
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
      const orders = dbOrderData.map((order) => order.get({ plain: true }));
      res.render("dashboard", { orders, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Order.findByPk(req.params.id, {
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
      if (dbOrderData) {
        const order = dbOrderData.get({ plain: true });

        res.render("edit-Order", {
          order,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;

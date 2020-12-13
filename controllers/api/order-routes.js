const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Order, User, Comment, Vote } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
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
    .then((dbOrderData) => res.json(dbOrderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
      res.json(dbOrderData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', order_url: 'https://taskmaster.com/press', user_id: 1}
  Order.create({
    title: req.body.title,
    order_url: req.body.order_url,
    user_id: req.session.user_id,
  })
    .then((dbOrderData) => res.json(dbOrderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/upvote", withAuth, (req, res) => {
  // custom static method created in models/Order.js
  Order.upvote(
    { ...req.body, user_id: req.session.user_id },
    { Vote, Comment, User }
  )
    .then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Order.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbOrderData) => {
      if (!dbOrderData) {
        res.status(404).json({ message: "No order found with this id" });
        return;
      }
      res.json(dbOrderData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOrderData) => {
      if (!dbOrderData) {
        res.status(404).json({ message: "No order found with this id" });
        return;
      }
      res.json(dbOrderData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

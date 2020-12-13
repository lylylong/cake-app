const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const orderRoutes = require("./order-routes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/comments", commentRoutes);

module.exports = router;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Order model
class Order extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      order_id: body.order_id,
    }).then(() => {
      return Order.findOne({
        where: {
          id: body.order_id,
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
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "order_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

// create fields/columns for Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "order",
  }
);

module.exports = Order;

const { MongoUnexpectedServerResponseError } = require("mongodb");
const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.findOneAndUpdate(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(400).json(err));
  },
};

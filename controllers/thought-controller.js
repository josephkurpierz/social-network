const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.status(400).json(err));
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },
  addThought({ body }, res) {
    Thought.create(body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThought } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thought found with that id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no reaction with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;

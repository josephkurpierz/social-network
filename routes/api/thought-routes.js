const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// route /api/thoughts
router.route("/").get(getAllThoughts).post(addThought);

//route /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

//route /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

//route /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

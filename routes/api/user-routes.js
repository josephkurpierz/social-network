const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// route /api/users
router.route("/").get(getAllUsers).post(createUser);

// route /api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

//routes /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;

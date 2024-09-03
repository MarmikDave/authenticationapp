// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const verifyToken = require("../middleware/auth");

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

// router.get("/protected", verifyToken, (req, res) => {
//   res.json({ message: "This is a protected route", userId: req.user.userId });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);
router.post("/userdata", verifyToken, authController.storeUserData);
router.get("/userdata", verifyToken, authController.getUserData);
router.get("/protected", verifyToken, authController.protected);

module.exports = router;
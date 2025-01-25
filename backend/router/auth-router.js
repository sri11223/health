const express = require("express");
const router = express.Router();
const controllers = require("../controllers/auth-contoller");
router.route("/register").post(controllers.register); // Ensure `register` is defined
router.route("/login").post(controllers.login); // Ensure `login` is defined
router.route("/health-data").post(controllers.saveHealthData);
router.route("/health-getdata").post(controllers.getHealthData);
router.route("/health-data/:userId").put(controllers.updateHealthData);
module.exports = router;
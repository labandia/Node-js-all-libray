const express = require("express");
const router = express.Router();
const authController = require("../controller/login-controller");
const registercontrol = require("../controller/register.controller");

// CREDENTIALS FOR LOGIN AND REGISTER
router.post("/login", authController.loginuser);
router.post("/register", registercontrol.handlenewuser);

module.exports = router;

const express = require("express");
const router = express.Router();
const postRoute = require("./post.routes");
// const getRoute = require("./get.routes");
const employRoute = require("./api/employee.routes");

router.use("/post", postRoute);
// router.use("/get", getRoute);
router.use("/emp", employRoute);

module.exports = router;

const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employee-controller");

router
   .route("/employee")
   .get(employeesController.getallEmployee)
   .post(employeesController.createEmployee)
   .put(employeesController.updateEmployee)
   .delete(employeesController.deleteEmployee);

router.route("/employee/:id").get(employeesController.getallEmployeeByID);

module.exports = router;

//Needed Resources
const express = require("express")
const router = new express.Router() // Using express we create a new router object.
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build invetory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build car view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId))
router.get("/detail/", utilities.handleErrors(invController.buildByInvId))

module.exports = router; // Exporting the router for use in other modules
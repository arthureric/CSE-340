//Needed Resources
const express = require("express")
const router = new express.Router() // Using express we create a new router object.
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require('../utilities/inventory-validation')

// Route to build invetory by classification view
router.get("/", utilities.handleErrors(invController.buildManagement))
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build car view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId))
router.get("/detail/", utilities.handleErrors(invController.buildByInvId))

router.get("/add-classification/", utilities.handleErrors(invController.buildAddClassification))
router.get("/add-inventory/", utilities.handleErrors(invController.buildAddInventory))

// Process the classification data
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.manageClassification)
  )

// Process the classification data
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.manageInventory)
)

module.exports = router; // Exporting the router for use in other modules
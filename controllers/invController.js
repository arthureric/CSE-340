const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  // Get inventory items by ID
  const data = await invModel.getInventoryByClassificationId(classification_id)
  // Build  grid
  const grid = await utilities.buildClassificationGrid(data);
  // navigation menu
  let nav = await utilities.getNav()
  const className = data[0].classification_name;
  // Render the classification
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleDetails(inv_id)
  const grid = await utilities.buildVehicleDetails(data)
  let nav = await utilities.getNav()
  const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/details", {
    title: className,
    nav,
    grid,
  })
}

module.exports = invCont
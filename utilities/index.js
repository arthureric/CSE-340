const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/*************************************
 * Populates the view with data from an individual item by id.
* ************************************ */
Util.getItem = async function (req, res, id) {
  let data = await invModel.getDetails(id)
  let list = '<ul class="inv-detail-view">'
  data.rows.forEach((row) => {
      list += '<li class="item-display-grid">'
      list += '<img class="inv-right" src="' + row.inv_image + '" alt="Image of ' + row.inv_make + ' ' + row.inv_model + '"/>'
      list += '<h2 class="inv-right">' + row.inv_year + ' ' + row.inv_make + ' ' + row.inv_model + '</h2>'
      list += '<p class="inv-right"><b>Description:</b> ' + row.inv_description + '</p>'
      list += '<p class="inv-right"><b>Color:</b> ' + row.inv_color + '</p>'
      list += '<p class="inv-right"><b>Mileage:</b> ' + row.inv_miles + '</p>'
      list += '<p class="inv-right"><b>Price:</b> $' + row.inv_price + '</p>'
      list += '<a class="inv-right" href="/contactus">'
      list += '<p class="inv-right" id="buy-car">Buy Now</p>'
      list += "</a>"
      list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
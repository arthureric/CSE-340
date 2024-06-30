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

/* **************************************
* Car details into HTML
* ************************************ */
Util.buildCarGrid = async function(data){
  let grid
  if (data.length > 0) {
      car_data = data[0]
      grid = '<div id="ind-car">'
      grid+= '<img src="' + car_data.inv_image +
      '" alt="Image of '+ car_data.inv_make + ' ' + car_data.inv_model
      +' On CSE Motors" />'
      grid+= '<div class="description">'
      grid+= '<h2>' + car_data.inv_make + ' ' + car_data.inv_model + ' Details' + '</h2>'
      grid+= '<h2>' + 'Price: ' + '<span>$' 
      + new Intl.NumberFormat('en-US').format(car_data.inv_price) + '</span>' +'</h2>'
      grid+= '<p>'
      grid+= '<span>Description: ' + '</span>' + car_data.inv_description
      grid+= '</p>'
      grid+= '<p>'
      grid+= '<span>Color: ' + '</span>' + car_data.inv_color
      grid+= '</p>'
      grid+= '<p>'
      grid+= '<span>Miles: ' + '</span>' + car_data.inv_miles
      grid+= '</p>'
      grid+= '</div>'
      grid+= '</div>'   
  } else{
      grid+= '<p class="notice">Sorry, there is not vehicles of this model' + '</p>'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
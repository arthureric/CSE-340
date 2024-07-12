// Needed Resources 
const express = require("express") // Brings express into scope.
const router = new express.Router() // Using express we create a new router object.
const accountController = require("../controllers/accountController") // Brings the invController into scope.
const Util = require('../utilities/')
const regValidate = require('../utilities/account-validation')

/* ***************************
 *  Build Account
 * ************************** */
// Deliver Login View
router.get("/login", Util.handleErrors(accountController.buildLogin))
// Route to build Default Account View
router.get("/register", Util.handleErrors(accountController.buildRegister))
// Route to check Login
router.get("/", Util.checkLogin, Util.handleErrors(accountController.buildManagement))

// Deliver Edit Account View
router.get(
  "/logout",
  Util.handleErrors(accountController.logoutAccount),
)

// Deliver Register View
// router.get("/register", accountController.buildRegister);

// Deliver Edit Account View
// router.get("/edit/:account_id", accountController.buildEditAccountView);


// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  Util.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.LoginRules(),
  regValidate.checkLoginData,
  (req, res) => {
    res.status(200).send('login process')
  }
)

module.exports = router; // exports the router objects to be used elsewhere in the project.
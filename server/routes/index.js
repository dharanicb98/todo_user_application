const customerController = require('../controllers/userController')

const setUpRoutes = ( app )  => {
   app.use(`/api/customers`, customerController)
}


module.exports.setUpRoutes = setUpRoutes;
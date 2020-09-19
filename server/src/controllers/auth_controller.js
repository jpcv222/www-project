const authController = {};
const resources_controller = require('../resources/resources_controller');

authController.auth = async (req, res) => {
    try {
        res.json(resources_controller.leerRecurso(1000));
    } catch (error) {
        console.log(error)
    }
}


module.exports = authController;
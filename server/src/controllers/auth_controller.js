const authController = {};
const resources_controller = require('../resources/resources_controller');
const generic_controller = require('./generic_controller');


authController.auth = async (req, res) => {
    try {
        const io = req.app.get('socketIo');
        const query = {
            text: "select ($1) prueba",
            values: [1]
        };
        const resObj = await generic_controller.ExecuteQuery(query);
        
        if(resObj.status == "success"){
            res.json(resObj.data)
        }else{
            res.json(resources_controller.leerRecurso(1000, resObj.data));
        }

    } catch (error) {
        console.log(error)
    }finally{
        resObj = {};
    }
}

module.exports = authController;
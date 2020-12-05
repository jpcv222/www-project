const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user_manage_controller');


router.route('/getUsers')
    .post(userController.getUsers)

router.route('/insertUser')
    .post(userController.createUser)

router.route('/assignPatient')
    .post(userController.assignPatient)

router.route('/updateUser/:id')
    .post(userController.updateUser)

router.route('/disableUser/:id')
    .post(userController.disableUser)

router.route('/enableUser/:id')
    .post(userController.enableUser)

router.route('/updatePassword/:id')
    .post(userController.updatePassword)

router.route('/updateLocation/:id')
    .post(userController.updateLocation)

router.route('/getPatientsLocations')
    .post(userController.getPatientsLocations)

router.route('/getLogs')
    .post(userController.getLogs)

router.route('/getAllLogs')
    .post(userController.getAllLogs)

router.route('/getAllAlerts')
    .post(userController.getAllAlerts)

module.exports = router;
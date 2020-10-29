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

module.exports = router;
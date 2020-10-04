const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth_controller');


router.route('/login')
    .post(authController.auth)

module.exports = router;
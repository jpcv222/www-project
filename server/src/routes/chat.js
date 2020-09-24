const { Router } = require('express');
const router = Router();

const chatController = require('../controllers/api_socket_controller');


router.route('/test')
    .post(chatController.test)

module.exports = router;
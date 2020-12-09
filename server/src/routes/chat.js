const { Router } = require('express');
const router = Router();

const chatController = require('../controllers/chat_controller');


router.route('/getFriendList')
    .post(chatController.getFriendList)

router.route('/getMessages')
    .post(chatController.getMessages)

module.exports = router;
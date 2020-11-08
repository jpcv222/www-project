const { Router } = require('express');
const router = Router();

const alertController = require('../controllers/alerts_controller');


router.route('/getAlerts')
    .post(alertController.getAlerts)

router.route('/markAsSeen')
    .post(alertController.markAsSeen)

router.route('/getCount')
    .post(alertController.getCount)

module.exports = router;
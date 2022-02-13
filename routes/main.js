const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const {
    create_user, get_dashboard
} = require('../controllers/main');

router.route('/login').post(create_user);
router.route('/dashboard').get(authMiddleware, get_dashboard);

module.exports = router;
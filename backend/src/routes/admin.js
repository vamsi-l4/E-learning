const express = require('express');
const { getUsers, getReports } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/users', adminAuth, getUsers);
router.get('/reports', adminAuth, getReports);

module.exports = router;
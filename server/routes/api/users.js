const express = require('express');
const router = express.Router();
const { getUsers } = require('../../controllers/usersController');

// @route   GET api/users
// @desc    Get all users
// @access  Public (for now, will be private)
router.get('/', getUsers);

module.exports = router;

const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllUsers,
  searchUsers,
} = require('../../../controllers/admin/usersControllers');

const router = express.Router();

router.get('/',cache.get, getAllUsers, cache.set);
router.get('/search',cache.get, searchUsers, cache.set);

module.exports = router;

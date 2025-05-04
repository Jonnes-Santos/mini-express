const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/validate-cpf', authController.validateCpf);
module.exports = router;
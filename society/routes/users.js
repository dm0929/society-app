var express = require('express');
var router = express.Router();

var restService = require('../rest/rest-service');

/* GET users listing. */
router.get('/get/member', restService.fetchMemberData);
router.get('/get/member/:id', restService.fetchMemberData);
router.get('/get/address', restService.fetchAddressData);
router.get('/get/address/:id', restService.fetchAddressData)
router.get('/get/loan', restService.fetchLoanData);
router.get('/get/loan/:id', restService.fetchLoanData);
router.get('/get/deposit/history', restService.fetchDepositData);
router.get('/get/deposit/history/:id', restService.fetchDepositData);

module.exports = router;

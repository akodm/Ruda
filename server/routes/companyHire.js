var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const CompanyInfo = models.companyInfo;
const CompanyHire = models.companyHire;
const Company = models.company;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

module.exports = router;

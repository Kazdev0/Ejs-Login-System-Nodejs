const express = require("express");
const router = express.Router();
const {getUserLogin, postUserLogin, getUserRegister, postUserRegister} = require("../controllers/userControllers")

router.get("/login",getUserLogin);

router.get("/register",getUserRegister)
router.post("/login",postUserLogin);

router.post("/register",postUserRegister)


module.exports = router;
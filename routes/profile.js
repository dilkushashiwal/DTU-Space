const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {getAllProfilePost}=  require("../controllers/profileController");

router.get("/profile",isAuth ,getAllProfilePost);

module.exports = router;

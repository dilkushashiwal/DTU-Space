const express = require("express");
const path = require("path");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {getAllBlogs,getAllNotice,getAllInterview,getAllContent,getAllComments,getAllexplore} = require('../controllers/postController')
router.get("/blog", getAllBlogs);

router.get("/notice", getAllNotice );

router.get("/interview", getAllInterview);

router.get("/content", getAllContent);

router.post("/content", getAllComments);


module.exports = router;

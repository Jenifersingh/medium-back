const express = require("express");
const { isAuthenticated } = require("../controller/auth");

const { getPosts, newPost, updatePost } = require("../controller/post");

const router = express.Router();

router.get("/posts", getPosts);

router.post("/post/create", isAuthenticated, newPost);

router.put("/post/:postId", isAuthenticated, updatePost);

module.exports = router;

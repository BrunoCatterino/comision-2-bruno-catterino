const express = require("express");
const { createPost, showPost, showSinglePost, deletePost, updatePost, addComment, addLike, removeLike } = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//Blog Routes
router.post("/post/create", isAuthenticated, isAdmin, createPost);
router.get('/post/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deletePost);
router.put('/update/post/:id', isAuthenticated, isAdmin, updatePost);
router.put('/comment/post/:id', isAuthenticated, isAdmin, addComment);
router.put('/addlike/post/:id', isAuthenticated, isAdmin, addLike);
router.put('/removelike/post/:id', isAuthenticated, isAdmin, removeLike);


module.exports = router;

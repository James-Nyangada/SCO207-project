const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newBlog = new Blog({ title, author, content });
        await newBlog.save();
        res.status(201).json({ message: "Blog added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

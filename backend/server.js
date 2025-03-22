const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "<YOUR_MONGO_URI>";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', BlogSchema);

// Route to create a new blog post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, author, content } = req.body;
        if (!title || !author || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBlog = new Blog({ title, author, content });
        await newBlog.save();
        res.status(201).json({ message: "🎉 Blog post created successfully!" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Route to fetch all blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetch all blogs, newest first
        res.json(blogs);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

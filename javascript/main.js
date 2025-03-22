document.addEventListener("DOMContentLoaded", async function () {
    const postsContainer = document.getElementById("posts-container");

    try {
        const response = await fetch("http://localhost:5000/api/posts");
        const blogs = await response.json();

        if (blogs.length === 0) {
            postsContainer.innerHTML = "<p>No blog posts available.</p>";
            return;
        }

        postsContainer.innerHTML = blogs
            .map(
                (blog) => `
                <article class="blog-post">
                    <h3><a href="blog-details.html?id=${blog._id}">${blog.title}</a></h3>
                    <p><strong>By:</strong> ${blog.author}</p>
                    <p>${blog.content.substring(0, 150)}...</p>
                    <small>Published on: ${new Date(blog.createdAt).toLocaleDateString()}</small>
                </article>
                `
            )
            .join("");
    } catch (error) {
        postsContainer.innerHTML = `<p style="color: red;">Failed to load posts.</p>`;
    }
});

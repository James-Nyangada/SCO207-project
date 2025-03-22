document.addEventListener("DOMContentLoaded", async function () {
    const blogContent = document.getElementById("blog-content");

    // Get blog ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (!blogId) {
        blogContent.innerHTML = "<p style='color: red;'>Invalid blog post.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/posts/${blogId}`);
        if (!response.ok) throw new Error("Blog not found");

        const blog = await response.json();

        blogContent.innerHTML = `
            <article>
                <h2>${blog.title}</h2>
                <p><strong>By:</strong> ${blog.author}</p>
                <small>Published on: ${new Date(blog.createdAt).toLocaleDateString()}</small>
                <p>${blog.content}</p>
            </article>
        `;
    } catch (error) {
        blogContent.innerHTML = "<p style='color: red;'>Failed to load blog post.</p>";
    }
});

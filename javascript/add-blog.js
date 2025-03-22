

  document.getElementById("blog-form").addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent form from refreshing page

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;

    if (!title || !author || !content) {
        alert("All fields are required!");
        return;
    }

    const blogPost = { title, author, content };

    try {
        const response = await fetch("http://localhost:5000/api/posts", {  // ✅ FIXED URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogPost)
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        const data = await response.json();
        alert("🎉 Blog post published successfully!");
        window.location.href = "index.html";  // Redirect to home after posting

    } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post. Please try again.");
    }
});


  
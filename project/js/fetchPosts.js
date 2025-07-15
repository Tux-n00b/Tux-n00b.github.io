// Centralized post fetching logic for >_Tux

export async function fetchPosts() {
    const response = await fetch('/blog.json');
    if (!response.ok) throw new Error('Failed to load posts');
    const postsData = await response.json();
    return Array.isArray(postsData.posts) ? postsData.posts : Object.values(postsData);
}

export async function fetchPostContent(slug) {
    const response = await fetch(`/posts/${slug}.md`);
    if (!response.ok) throw new Error('Failed to load post content');
    return await response.text();
} 
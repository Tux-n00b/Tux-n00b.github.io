import { fetchPosts } from './fetchPosts.js';
import { formatDate, renderError } from './utils.js';

document.addEventListener('DOMContentLoaded', async function() {
    // Home button
    document.querySelector('.home-btn')?.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // Load posts
    try {
        const posts = await fetchPosts();
        const container = document.getElementById('blog-archive');
        if (!container) throw new Error('Container element not found');
        container.innerHTML = '';
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (posts.length === 0) {
            container.innerHTML = '<p class="text-gray-400">No posts found</p>';
            return;
        }
        posts.forEach(post => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card bg-gray-800 p-6 rounded-lg mb-6 hover:border-green-400 border border-gray-700 transition';
            blogCard.innerHTML = `
                <div class="flex items-start">
                    <img src="${post.thumbnail || '/assets/Thumbnails/default-thumb.jpg'}" 
                         alt="${post.title}"
                         class="w-24 h-24 object-cover mr-4 rounded">
                    <div>
                        <h3 class="text-xl font-bold text-green-400 mb-2">${post.title}</h3>
                        <p class="text-gray-400 text-sm mb-1">${formatDate(post.date)}</p>
                        ${post.description ? `<p class="text-gray-300 mb-3">${post.description}</p>` : ''}
                        <a href="post.html?slug=${encodeURIComponent(post.slug)}"
                           class="text-cyan-400 hover:underline">
                            Read more →
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Blog loading error:', error);
        const container = document.getElementById('blog-archive');
        if (container) renderError(container, error.message);
    }
});
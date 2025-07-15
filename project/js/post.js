import { fetchPosts, fetchPostContent } from './fetchPosts.js';
import { formatDate, renderError } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug || slug === 'undefined') {
        renderError(document.getElementById('post-content'), 'Invalid post specified');
        return;
    }

    loadPost(slug);

    // Home button functionality
    document.querySelector('.home-btn')?.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});

async function loadPost(slug) {
    try {
        // Load post metadata
        const posts = await fetchPosts();
        let postMeta = posts.find(post => post.slug === slug);
        if (!postMeta) {
            // Try case-insensitive match
            postMeta = posts.find(post => post.slug.toLowerCase() === slug.toLowerCase());
            if (!postMeta) throw new Error('Post not found');
        }
        // Load markdown content
        const content = await fetchPostContent(postMeta.slug);
        renderPost(postMeta, content);
    } catch (error) {
        console.error('Error loading post:', error);
        renderError(document.getElementById('post-content'), error.message);
    }
}

function renderPost(meta, content) {
    document.title = `>_Tux | ${meta.title}`;
    document.getElementById('post-title').textContent = meta.title;
    document.getElementById('post-date').textContent = formatDate(meta.date);

    // Render tags
    const tagsContainer = document.getElementById('post-tags');
    tagsContainer.innerHTML = '';
    if (meta.tags && meta.tags.length > 0) {
        meta.tags.forEach(tag => {
            const tagElement = document.createElement('a');
            tagElement.className = 'post-tag cursor-pointer hover:bg-green-700 hover:text-black transition';
            tagElement.textContent = tag;
            tagElement.href = `/project/tags.html?tag=${encodeURIComponent(tag)}`;
            tagElement.title = `Show all posts tagged with ${tag}`;
            tagsContainer.appendChild(tagElement);
        });
    }

    // Configure marked.js
    marked.setOptions({
        breaks: true,
        gfm: true,
        baseUrl: '../../assets/images'
    });

    // Render markdown content
    const contentWithoutFrontMatter = content.replace(/^---[\s\S]*?---/, '');
    document.getElementById('post-content').innerHTML = marked.parse(contentWithoutFrontMatter);
}
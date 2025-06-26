// Predefined tags
const predefinedTags = [
    "Binary Exploitation",
    "Reverse Engineering",
    "Web Exploitation",
    "Active Directory",
    "Bug Bounty"
];

let allPosts = [];
let activeTag = null;

// Render tag buttons
function renderTags() {
    const tagList = document.getElementById('tag-list');
    tagList.className = 'tags-cards mb-6';
    tagList.innerHTML = '';
    predefinedTags.forEach(tag => {
        const card = document.createElement('button');
        card.className = `tag-card${activeTag === tag ? ' ring-2 ring-green-400' : ''}`;
        card.textContent = tag;
        card.onclick = () => {
            activeTag = tag;
            renderTags();
            renderPosts();
        };
        tagList.appendChild(card);
    });
}

// Render posts grid
function renderPosts() {
    const grid = document.getElementById('posts-grid');
    grid.innerHTML = '';
    if (!activeTag) {
        grid.innerHTML = '<div class="text-gray-400 col-span-full text-center">Select a tag to view posts.</div>';
        return;
    }
    const filtered = allPosts
        .filter(post => Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase() === activeTag.toLowerCase()))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="text-gray-400 col-span-full text-center">No posts found for <span class='text-green-400'>${activeTag}</span>.</div>`;
        return;
    }
    filtered.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card bg-gray-800 p-6 rounded-lg hover:border-green-400 border border-gray-700 transition flex flex-col';
        card.innerHTML = `
            <img src="${post.thumbnail || '/assets/Thumbnails/default-thumb.jpg'}" alt="${post.title}" class="w-full h-40 object-cover rounded mb-4">
            <h3 class="text-xl font-bold text-green-400 mb-2">${post.title}</h3>
            <p class="text-gray-400 text-sm mb-1">${new Date(post.date).toLocaleDateString()}</p>
            <p class="text-gray-300 mb-3 flex-grow">${post.description || ''}</p>
            <a href="post.html?slug=${encodeURIComponent(post.slug)}" class="read-more text-cyan-400 hover:underline mt-auto">Read more →</a>
        `;
        grid.appendChild(card);
    });
}

// Fetch posts from blog.json
async function loadPosts() {
    try {
        const res = await fetch('../../blog.json');
        const data = await res.json();
        allPosts = Object.values(data);
        // Check for tag in URL
        const urlParams = new URLSearchParams(window.location.search);
        const tagFromUrl = urlParams.get('tag');
        if (tagFromUrl && predefinedTags.includes(tagFromUrl)) {
            activeTag = tagFromUrl;
        }
        renderTags();
        renderPosts();
    } catch (e) {
        document.getElementById('posts-grid').innerHTML = '<div class="text-red-400">Failed to load posts.</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);

// Home button navigation
const homeBtn = document.querySelector('.home-btn');
homeBtn && homeBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});
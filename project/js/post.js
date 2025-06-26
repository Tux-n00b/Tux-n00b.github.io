document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug || slug === 'undefined') {
        renderError('Invalid post specified');
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
        const postsResponse = await fetch('../../blog.json');
        if (!postsResponse.ok) throw new Error('Failed to load posts');
        
        const posts = await postsResponse.json();
        const postMeta = posts[slug];
        
        if (!postMeta) {
            // Try case-insensitive match
            const foundKey = Object.keys(posts).find(key => 
                key.toLowerCase() === slug.toLowerCase());
            if (foundKey) {
                return loadPost(foundKey);
            }
            throw new Error('Post not found');
        }
        
        // Load markdown content
        const contentResponse = await fetch(`../../posts/${postMeta.slug}.md`);
        if (!contentResponse.ok) throw new Error('Failed to load post content');
        
        const content = await contentResponse.text();
        renderPost(postMeta, content);
        
    } catch (error) {
        console.error('Error loading post:', error);
        renderError(error.message);
    }
}

function renderPost(meta, content) {
    document.title = `>_Tux | ${meta.title}`;
    document.getElementById('post-title').textContent = meta.title;
    document.getElementById('post-date').textContent = new Date(meta.date).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    });

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

function renderError(message) {
    const postContent = document.getElementById('post-content');
    postContent.innerHTML = `
        <div class="text-center py-12">
            <p class="text-red-400">${message}</p>
            <a href="/blogs.html" class="text-green-400 hover:underline mt-4 inline-block">
                Back to Blog
            </a>
        </div>
    `;
}
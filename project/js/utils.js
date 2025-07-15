// Utility functions for >_Tux

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function renderError(container, message) {
    container.innerHTML = `
        <div class="text-center py-12">
            <p class="text-red-400">${message}</p>
            <a href="/project/blogs.html" class="text-green-400 hover:underline mt-4 inline-block">
                Back to Blog
            </a>
        </div>
    `;
} 
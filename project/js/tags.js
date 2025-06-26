// Tags data
const tags = {
    "ctf": 1,
    "cyberdefenders": 2,
    "htb": 1,
    "osint": 1,
    "sherlocks": 1,
    "social engineering": 4,
    "threat intel": 2
};

function loadTags() {
    const tagsContainer = document.getElementById('tags-container');
    
    for (const [tag, count] of Object.entries(tags)) {
        const tagDiv = document.createElement('div');
        tagDiv.className = 'flex items-center';
        
        const tagElement = document.createElement('span');
        tagElement.className = 'text-green-400 mr-2';
        tagElement.textContent = tag;
        
        const countElement = document.createElement('span');
        countElement.className = 'text-gray-500';
        countElement.textContent = `(x${count})`;
        
        tagDiv.appendChild(tagElement);
        tagDiv.appendChild(countElement);
        tagsContainer.appendChild(tagDiv);
    }
}

// Load tags when page loads
document.addEventListener('DOMContentLoaded', loadTags);

document.querySelector('.home-btn')?.addEventListener('click', () => {
    window.location.href = '../index.html';
});
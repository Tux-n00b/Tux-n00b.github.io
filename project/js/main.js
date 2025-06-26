// Uptime counter
let seconds = 17507600; // Starting from 202d 16h 36m 33s

function updateUptime() {
    seconds++;
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.getElementById('uptime-counter').textContent = `${days}d ${hours}h ${minutes}m ${secs}s`;
}

setInterval(updateUptime, 1000);

// Real-time clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Theme toggle
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// System prefers color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.classList.remove('dark');
}

// Make title clickable (home button)
document.getElementById('main-title')?.addEventListener('click', () => {
    window.location.href = './index.html';
});



        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#e6e6e6';
            } else {
                document.body.style.backgroundColor = '#ffffff';
                document.body.style.color = '#1a1a1a';
            }
        });



document.querySelector('.prompt-end').addEventListener('click', function() {
    let sudoBuffer = '';
    let promptElement = this;
    
    // Create input element (hidden terminal-like input)
    const inputElement = document.createElement('span');
    inputElement.className = 'text-green-500 ml-1';
    promptElement.parentNode.appendChild(inputElement);
    
    // Visual feedback
    promptElement.classList.add('text-green-500', 'animate-pulse');
    
    // Key listener just for this session
    const keyHandler = (e) => {
        if (e.key === 'Escape') {
            cleanUp();
            return;
        }
        
        if (e.key === 'Backspace') {
            sudoBuffer = sudoBuffer.slice(0, -1);
        } else if (e.key.length === 1) {  // Only alphanumeric keys
            sudoBuffer += e.key.toLowerCase();
        }
        
        // Visual typing feedback
        inputElement.textContent = '_'.repeat(sudoBuffer.length);
        
        if (sudoBuffer === 'sudo') {
            // Success - show notification with redirect
            const sudoAlert = document.createElement('div');
            sudoAlert.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-2 border-green-500 p-6 rounded-lg z-50';
            sudoAlert.innerHTML = `
                <div class="flex items-center mb-4">
                    <span class="text-green-500">[white@root:~<span class="text-green-500">#</span>] sudo</span>
                </div>
                <p class="mb-4">Permission granted. Redirecting to write mode...</p>
                <div class="flex space-x-4">
                    <button id="cancel-btn" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
                        Cancel
                    </button>
                    <button id="proceed-btn" class="px-4 py-2 bg-green-700 hover:bg-green-600 rounded transition">
                        Proceed →
                    </button>
                </div>
            `;
            
            document.body.appendChild(sudoAlert);
            
            // Button handlers
            document.getElementById('cancel-btn').addEventListener('click', cleanUp);
            document.getElementById('proceed-btn').addEventListener('click', () => {
                cleanUp();
                window.location.href = '/admin/post.html';
            });
            
            // Auto-redirect after 3 seconds
            const redirectTimer = setTimeout(() => {
                cleanUp();
                window.location.href = '/admin/post.html';
            }, 3000);
            
            function cleanUp() {
                clearTimeout(redirectTimer);
                document.removeEventListener('keydown', keyHandler);
                promptElement.classList.remove('text-green-500', 'animate-pulse');
                inputElement.remove();
                if (sudoAlert.parentNode) {
                    document.body.removeChild(sudoAlert);
                }
            }
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    
    // Timeout after 5 seconds of inactivity
    const timeout = setTimeout(cleanUp, 5000);
    
    function cleanUp() {
        document.removeEventListener('keydown', keyHandler);
        clearTimeout(timeout);
        promptElement.classList.remove('text-green-500', 'animate-pulse');
        inputElement.remove();
    }
});














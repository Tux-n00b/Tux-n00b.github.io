// Injects a live uptime timer at the bottom-left of the page
(function() {
    // Remove any old timer
    document.querySelectorAll('.uptime-timer').forEach(e => e.remove());
    // Create timer
    const timerDiv = document.createElement('div');
    timerDiv.className = 'uptime-timer';
    document.body.appendChild(timerDiv);
    // Uptime logic
    const startTime = new Date('2025-01-01T00:00:00Z');
    function updateUptime() {
        const now = new Date();
        let diff = Math.floor((now - startTime) / 1000);
        const days = Math.floor(diff / (24 * 3600));
        diff %= 24 * 3600;
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        timerDiv.textContent = `SYSTEM STATUS • ONLINE ${days}d ${hours}h ${minutes}m ${seconds}s • © 2025 >_Tux`;
    }
    updateUptime();
    setInterval(updateUptime, 1000);
})(); 
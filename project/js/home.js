 
// Typewriter effect for title
const title = ">_Tux";
const titleElement = document.getElementById('main-title');

function typeWriter() {
    titleElement.textContent = '';
    titleElement.classList.add('typewriter');
    titleElement.textContent = title;
    
    // Remove animation after completion
    setTimeout(() => {
        titleElement.classList.remove('typewriter');
    }, 1100); // 1000ms typing + 500ms pause
}

// Initial load with delay
setTimeout(typeWriter, 150);
// About page content with typing effect
const aboutContent = [
    "I am >_Tux.",
    "",
    "Red teamer. CIF tactician. Student of systems—and their failure points.",
    "",
    "Proud operative of p3rf3ctr0dt.",
    "",
    "This space is not a blog. It is a ledger.",
    "",
    "A chronicle of engagements, extractions, exploits—both technical and psychological.",
    "",
    "I navigate the unseen layers of digital infrastructure, where security is an illusion and silence is a weapon.",
    "",
    "Each entry here reflects a lesson learned, a boundary tested, or a veil lifted.",
    "",
    "This isn't a showcase.",
    "It's a signal.",
    "",
    "Welcome to the other side."
];

const aboutContainer = document.getElementById('about-content');
let j = 0;

function typeAbout() {
    if (j < aboutContent.length) {
        const p = document.createElement('p');
        if (aboutContent[j] === "") {
            p.innerHTML = "&nbsp;";
        } else {
            p.textContent = aboutContent[j];
        }
        aboutContainer.appendChild(p);
        j++;
        setTimeout(typeAbout, 50);
    }
}

// Start typing effect
typeAbout();

document.querySelector('.home-btn')?.addEventListener('click', () => {
    window.location.href = '../index.html';
});
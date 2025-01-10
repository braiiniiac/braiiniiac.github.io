function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('real-time').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('hidden');
        navbar.classList.remove('visible');
    } else {
        navbar.classList.add('visible');
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
document.getElementById('current-date').textContent = currentDate;

const navLinks = document.querySelectorAll('.navbar ul li a');

function handleLinkClick(event) {
    const target = this.getAttribute('href');


    if (target === 'library.html') {
        window.location.href = target;
        return;
    }


    if (target.startsWith('index.html')) {
        return;
    }

    event.preventDefault();

    if (target === '#home') {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {

        const targetId = target.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
});


const logo_navbar = document.getElementById("navlogo");
logo_navbar.addEventListener("click", () => {
    window.location.href = "index.html"
});

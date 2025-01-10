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



async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const namehash = "37e55ce81e3cd41c12583f004d9ec1ebaafb88b6b27aa1c4d5398aed77d6a155"
const storedHash = "284967a1d4a9d76d333f3af8e66471b34db5fb611dc6b8f0c308659bf8606c82";


document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    const inputHash = await hashPassword(password);


    if (inputHash === storedHash) {
        document.getElementById('login-message').textContent = "Login successful!";
        document.getElementById('login-message').style.color = "green";
        window.location.href = "index.html"
    } else {
        document.getElementById('login-message').textContent = "Invalid username or password!";
        document.getElementById('login-message').style.color = "red";
    }
});
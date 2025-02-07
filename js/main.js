const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
document.getElementById('current-date').textContent = currentDate;

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const arrow = document.querySelector(".arrow-down");
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        arrow.style.display = 'none';
    } else {
        arrow.style.display = 'inline-block';
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const navLogo = document.getElementById("navlogo");
    navLogo.addEventListener("click", function () {
        if (window.innerWidth >= 768) {
            window.location.href = "index.html";
        }
    });
});

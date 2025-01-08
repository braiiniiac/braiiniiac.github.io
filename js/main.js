
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


const navLinks = document.querySelectorAll('.navbar ul li a');


function handleLinkClick(event) {
    event.preventDefault();


    navLinks.forEach(link => link.classList.remove('active'));


    this.classList.add('active');


    const target = this.getAttribute('href');


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


const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    {
        threshold: 0.5,
    }
);


sections.forEach(section => observer.observe(section));



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

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('main-header');
    const burger = document.getElementById('burger-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const slides = document.querySelectorAll('.hero-slide');
    
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 600);
    });

    setTimeout(() => { if(preloader.style.display !== 'none') preloader.remove(); }, 2000);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = () => {
            burger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };
    });
});

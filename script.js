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
    setInterval(() => {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }, 5000);

    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCounter = document.getElementById('lb-counter');
    const triggers = document.querySelectorAll('.lb-trigger');
    const images = Array.from(triggers).map(img => img.src);
    let currentIndex = 0;

    const updateLb = (idx) => {
        currentIndex = idx;
        lbImg.src = images[currentIndex];
        lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    triggers.forEach((el, i) => {
        el.addEventListener('click', () => {
            lb.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            updateLb(i);
        });
    });

    document.querySelector('.close-lb').onclick = () => {
        lb.style.display = 'none';
        document.body.style.overflow = '';
    };

    const nextIdx = () => updateLb((currentIndex + 1) % images.length);
    const prevIdx = () => updateLb((currentIndex - 1 + images.length) % images.length);

    document.querySelector('.next-lb').onclick = nextIdx;
    document.querySelector('.prev-lb').onclick = prevIdx;

    window.onkeydown = (e) => {
        if (lb.style.display === 'flex') {
            if (e.key === 'Escape') lb.style.display = 'none';
            if (e.key === 'ArrowRight') nextIdx();
            if (e.key === 'ArrowLeft') prevIdx();
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('main-header');
    const burger = document.getElementById('burger-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const slides = document.querySelectorAll('.hero-slide');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 600);
            }
        }, 500);
    });

    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 600);
        }
    }, 2000);

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
    });

    if (burger && navOverlay) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCounter = document.getElementById('lb-counter');
    const triggers = document.querySelectorAll('.lb-trigger');
    const images = Array.from(triggers).map(img => img.src);
    let currentIndex = 0;

    if (lb && lbImg) {
        const updateLb = (idx) => {
            currentIndex = idx;
            lbImg.src = images[currentIndex];
            if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        };

        triggers.forEach((el, i) => {
            el.addEventListener('click', () => {
                lb.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                updateLb(i);
            });
        });

        const closeBtn = document.querySelector('.close-lb');
        if (closeBtn) {
            closeBtn.onclick = () => {
                lb.style.display = 'none';
                document.body.style.overflow = '';
            };
        }

        const nextBtn = document.querySelector('.next-lb');
        const prevBtn = document.querySelector('.prev-lb');

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                updateLb((currentIndex + 1) % images.length);
            };
        }
        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.stopPropagation();
                updateLb((currentIndex - 1 + images.length) % images.length);
            };
        }

        window.onkeydown = (e) => {
            if (lb.style.display === 'flex') {
                if (e.key === 'Escape') closeBtn.click();
                if (e.key === 'ArrowRight') nextBtn.click();
                if (e.key === 'ArrowLeft') prevBtn.click();
            }
        };

        lb.onclick = (e) => {
            if (e.target === lb || e.target === lbImg) closeBtn.click();
        };
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (burger) burger.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

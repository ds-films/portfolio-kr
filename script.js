window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => { preloader.style.display = "none"; }, 500);
    }
});

setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        setTimeout(() => { preloader.style.display = "none"; }, 500);
    }
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) header.classList.add("scrolled");
            else header.classList.remove("scrolled");
        }
    });

    const burger = document.getElementById("burger-toggle");
    const navMenu = document.getElementById("nav-overlay");
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });
    }

    const slides = document.querySelectorAll(".hero-slide");
    let currentSlideIndex = 0;
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
        }, 5000);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (burger) burger.classList.remove("active");
            if (navMenu) navMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
});

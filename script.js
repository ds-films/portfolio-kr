
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
    if (slides.length > 1) {
        let currentSlideIndex = 0;
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

    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const lbCounter = document.getElementById("lb-counter");
    const triggers = document.querySelectorAll(".lb-trigger");
    
    if (lightbox && triggers.length > 0) {
        let currentIndex = 0;
        let imageArray = Array.from(triggers).map(img => img.src);

        const updateLightbox = () => {
            lbImg.src = imageArray[currentIndex];
            if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        };

        triggers.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add("active");
                lightbox.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        const closeBtn = document.querySelector(".lightbox-close") || document.querySelector(".close-lb");
        const nextBtn = document.querySelector(".lightbox-next") || document.querySelector(".next-lb");
        const prevBtn = document.querySelector(".lightbox-prev") || document.querySelector(".prev-lb");

        const closeLb = () => {
            lightbox.classList.remove("active");
            lightbox.style.display = "none";
            document.body.style.overflow = "";
        };

        if (closeBtn) closeBtn.onclick = closeLb;

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateLightbox();
            };
        }

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateLightbox();
            };
        }

        lightbox.onclick = (e) => {
            if (e.target === lightbox || e.target === lbImg) closeLb();
        };

        window.addEventListener("keydown", (e) => {
            if (lightbox.classList.contains("active") || lightbox.style.display === "flex") {
                if (e.key === "Escape") closeLb();
                if (e.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % imageArray.length;
                    updateLightbox();
                }
                if (e.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                    updateLightbox();
                }
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (burger) burger.classList.remove("active");
            if (navMenu) navMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
});

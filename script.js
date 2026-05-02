window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
});

setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header");
    const burger = document.getElementById("burger-toggle");
    const navMenu = document.getElementById("nav-overlay");
    const slides = document.querySelectorAll(".hero-slide");
    const observerElements = document.querySelectorAll('.fade-in-up');
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const lbCounter = document.getElementById("lb-counter");
    const triggers = document.querySelectorAll(".lb-trigger");
    const contactForm = document.querySelector(".contact-form");

    const handleScroll = () => {
        if (header) {
            if (window.scrollY > 50) header.classList.add("scrolled");
            else header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

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
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observerElements.forEach(el => observer.observe(el));

    if (lightbox && triggers.length > 0) {
        let currentIndex = 0;
        const imageArray = Array.from(triggers).map(img => img.src);

        const updateLightbox = () => {
            if (lbImg) {
                lbImg.style.opacity = "0";
                const tempImg = new Image();
                tempImg.src = imageArray[currentIndex];
                tempImg.onload = () => {
                    lbImg.src = imageArray[currentIndex];
                    lbImg.style.opacity = "1";
                };
            }
            if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        };

        triggers.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        const closeLb = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        };

        const showNext = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % imageArray.length;
            updateLightbox();
        };

        const showPrev = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
            updateLightbox();
        };

        document.querySelector(".lightbox-close")?.addEventListener("click", closeLb);
        document.querySelector(".lightbox-next")?.addEventListener("click", showNext);
        document.querySelector(".lightbox-prev")?.addEventListener("click", showPrev);
        
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLb();
        });

        window.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLb();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    contactForm.innerHTML = "<h3>감사합니다! 메시지가 성공적으로 전송되었습니다.</h3><p>곧 연락드리겠습니다.</p>";
                }
            } catch (error) {
                console.error("Form error:", error);
            }
        });
    }
});

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
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    const galleryImages = document.querySelectorAll(".lb-trigger");
    const lightbox = document.getElementById("lightbox");
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById("lb-img");
        const lightboxCounter = document.getElementById("lb-counter");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");

        let currentIndex = 0;
        let imageArray = Array.from(galleryImages).map(img => img.src);

        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        function updateLightbox() {
            lightboxImg.src = imageArray[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }

        closeBtn.onclick = closeLightbox;
        nextBtn.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex + 1) % imageArray.length; updateLightbox(); };
        prevBtn.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length; updateLightbox(); };
        lightbox.onclick = (e) => { if (e.target === lightbox || e.target === lightboxImg) closeLightbox(); };

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "ArrowLeft") prevBtn.click();
        });
    }
});

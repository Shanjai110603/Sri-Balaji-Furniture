document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Current Year for Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();

    // Mobile navigation toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');
    const navbar = document.getElementById('navbar');

    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            if(mobileMenu.classList.contains('active')) {
                navbar.classList.add('scrolled'); // Force solid bg when menu open
            } else if (window.scrollY <= 50) {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar Glassmorphism effect based on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if(scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (!mobileMenu.classList.contains('active')) {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Parallax Hero Background
    const heroBg = document.getElementById('hero-bg-container');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Hero Content Entrance
    gsap.from(".hero-subtitle", { y: 20, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-desc", { y: 30, opacity: 0, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.from(".hero-btns", { y: 30, opacity: 0, duration: 1, delay: 0.8, ease: "power3.out" });

    // Universal Section Header Reveals
    gsap.utils.toArray('.section').forEach(section => {
        const title = section.querySelector('.gsap-title');
        const reveals = section.querySelectorAll('.gsap-reveal');
        
        if (title) {
            gsap.from(title, {
                y: 40, opacity: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 80%" }
            });
        }
        
        if (reveals.length > 0) {
            gsap.from(reveals, {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 75%" }
            });
        }
    });

    // Staggered Cards Reveals
    const applyStaggerReveal = (triggerClass, elementClass) => {
        gsap.utils.toArray(triggerClass).forEach(container => {
            const elements = container.querySelectorAll(elementClass);
            if (elements.length > 0) {
                gsap.from(elements, {
                    y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: container, start: "top 80%" }
                });
            }
        });
    };

    applyStaggerReveal('#why-us', '.gsap-feature');
    applyStaggerReveal('#products', '.gsap-product');
    applyStaggerReveal('#materials', '.gsap-material');
    applyStaggerReveal('#locations', '.gsap-location');
    applyStaggerReveal('#contact', '.gsap-footer');

    // Counters Animation Observer
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 3. Initialize Swiper instances
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
        }
    });

    // WhatsApp Form Submit
    const waForm = document.getElementById('wa-form');
    if(waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const req = document.getElementById('req').value;
            
            const text = `Hi, I am ${name}. Phone: ${phone}. I have a custom furniture requirement:%0A${req}`;
            const waUrl = `https://wa.me/919791983075?text=${text}`;
            
            window.open(waUrl, '_blank');
        });
    }

    // Dynamic Image Injection using the previously scraped Real Images
    window.injectImages = function(imageArray) {
        if(!imageArray || imageArray.length === 0) return;
        
        const targets = [
            document.getElementById('about-img'),
            document.getElementById('cat-bed'),
            document.getElementById('cat-sofa'),
            document.getElementById('cat-dining'),
            document.getElementById('cat-wardrobe'),
            document.getElementById('cat-office'),
            document.getElementById('gal-1'),
            document.getElementById('gal-2'),
            document.getElementById('gal-3'),
            document.getElementById('gal-4'),
            document.getElementById('gal-5'),
            document.getElementById('gal-6')
        ];
        
        // Background for hero
        if(imageArray[0]) {
            document.getElementById('hero-bg-container').style.backgroundImage = `url('${imageArray[0]}')`;
        }

        let imgIdx = 1; 
        targets.forEach(target => {
            if(target && imgIdx < imageArray.length) {
                target.innerHTML = `<img src="${imageArray[imgIdx]}" alt="Furniture display" loading="lazy" />`;
                target.classList.add('loaded');
                
                imgIdx++;
                if (imgIdx >= imageArray.length) imgIdx = 0; 
            }
        });
    };

    // Scraped images from Google Maps
    const productionImages = [
        "https://lh3.googleusercontent.com/p/AF1QipM0OKEbliM0QIU9kpmW4j5yBSkz9f2qmFi0D1jV=s1600",
        "https://lh3.googleusercontent.com/p/AF1QipOstFq8qpIpfsUTkWWYat7CvPMl3DlO3zB8eORt=s1600",
        "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqC9YVsGZ0D1N_3-qgQ9gYvElQccYBm0qPPPErkUlhSxySeOQB_3q0JEZk2XK00p2KeJcU0T6GYIH5TerqxhQ2tZv2EI0-mhCq40iqbIlVU-ng_sSGvMwRwoNJuqa4E8kXio_hwpg=s1600",
        "https://lh3.googleusercontent.com/p/AF1QipNdxW259unLAISWDyhyUW8bPWxBnzmpWWQGv_4V=s1600",
        "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoMd8UkOgrqU7sycPigZLu-yZyYuy0zcTfOppjh7c9gP-RsetiAwDz-89vD-ptOJQxutHz9Fo9X6aeExl3DFi2AEbyLW4HJFtLZB4v_5YFQP7N41eCgbyay-_PBNSn6QjnsRK4q=s1600",
        "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepJiar09yd6u4TNe2SRoUgGqJhf5SGUaCIz63FEPMK_RzMiAL2H6jzrQwV5ZP7Jx4PM34CpKkAoqRUwlMlxuguz49yoiUM2bkAZWxN0NnPP5BCUSUNsALjijjED4kc5idso9thk0A=s1600"
    ];
    
    injectImages(productionImages);
});

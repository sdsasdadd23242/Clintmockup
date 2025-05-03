// Vac to the Future - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle - Enhanced left slide menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const body = document.body;
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Function to calculate and set viewport height variable for mobile browsers
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set viewport height initially and on resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Function to check if we're on a mobile device
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // Initialize mobile menu
    function initMobileMenu() {
        if (window.innerWidth < 768 && menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                // Toggle body scroll
                document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
            });
            // Close menu when clicking links
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                });
            });
            // Close menu when resizing to desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            });
        } else {
            // On desktop, ensure menu is visible and no mobile menu logic runs
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add nav mobile styles dynamically for the slide-in menu
    const style = document.createElement('style');
    style.innerHTML = `
        /* Mobile Menu Styles */
        .menu-toggle {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 28px;
            height: 20px;
            position: relative;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .menu-toggle:focus {
            outline: 2px solid var(--flux-blue);
        }
        
        .menu-toggle span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: var(--flux-blue);
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background-color: var(--neon-orange);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background-color: var(--neon-orange);
        }
        
        /* Hide the default menu icon */
        .menu-toggle i {
            display: none;
        }
        
        /* Body when menu is open */
        body.menu-open {
            overflow: hidden;
        }
        
        /* Overlay for when menu is open */
        body.menu-open:before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 90;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Slide-in menu */
        nav ul {
            transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
        }
        
        nav ul.show {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background-color: var(--midnight-blue);
            padding: 80px 20px 30px;
            box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
            z-index: 95;
            transform: translateX(0);
            overflow-y: auto;
            border-right: 1px solid var(--flux-blue);
            animation: slideIn 0.4s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        @media (max-width: 767px) {
            nav ul {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background-color: var(--midnight-blue);
                padding: 80px 20px 30px;
                z-index: 95;
                transform: translateX(-100%);
                overflow-y: auto;
                border-right: 1px solid var(--flux-blue);
                transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
            }
        }
        
        nav ul.show li {
            margin: 15px 0;
            text-align: left;
            opacity: 0;
            transform: translateX(-10px);
            animation: fadeItems 0.5s ease forwards;
        }
        
        nav ul.show li:nth-child(1) { animation-delay: 0.1s; }
        nav ul.show li:nth-child(2) { animation-delay: 0.2s; }
        nav ul.show li:nth-child(3) { animation-delay: 0.3s; }
        nav ul.show li:nth-child(4) { animation-delay: 0.4s; }
        nav ul.show li:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes fadeItems {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        nav ul.show li a {
            padding: 10px 0;
            display: block;
            font-size: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        nav ul.show li a:hover {
            padding-left: 5px;
            color: var(--neon-orange);
        }
        
        nav ul.show li:last-child {
            margin-top: 25px;
            padding-top: 15px;
            position: relative;
        }
        
        nav ul.show li:last-child:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 1px;
            background-color: var(--neon-orange);
            opacity: 0.5;
        }
        
        nav ul.show li:last-child a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 0 auto;
            padding: 12px 20px;
            font-size: 1rem;
            background-color: var(--neon-orange);
            color: var(--white);
            border-radius: 5px;
            border-bottom: none;
            text-align: center;
        }
        
        nav ul.show li:last-child a:hover {
            background-color: var(--flux-blue);
            transform: translateY(-2px);
            padding-left: 20px;
        }
        
        .mobile-call-button {
            display: block;
            text-align: center;
            padding: 15px 10px;
            margin: 20px auto;
            color: var(--white);
            font-family: 'Orbitron', sans-serif;
            font-weight: 500;
            border: 1px solid var(--neon-orange);
            border-radius: 5px;
            background-color: var(--neon-orange);
            text-decoration: none;
        }
        
        .mobile-call-button i {
            margin-right: 8px;
        }
        
        .brand-logo-mobile {
            display: none;
            margin: 20px auto;
            max-width: 200px;
            text-align: center;
        }
        
        @media (max-width: 767px) {
            .brand-logo-mobile {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Testimonials Carousel
    const reviewCarousel = document.querySelector('.review-carousel');
    if (reviewCarousel) {
        const reviews = document.querySelectorAll('.review');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const dots = document.querySelectorAll('.dot');
        
        let currentIndex = 0;
        const totalReviews = reviews.length;
        
        // Initialize carousel
        function updateCarousel() {
            // Remove active class from all reviews and dots
            reviews.forEach(review => review.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current review and dot
            reviews[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        // Initialize the carousel on page load
        updateCarousel();
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalReviews;
                updateCarousel();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-rotate every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % totalReviews;
            updateCarousel();
        }, 5000);
    }
    
    // Services Carousel
    const servicesCarousel = document.querySelector('.services-carousel');
    if (servicesCarousel) {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const dots = document.querySelectorAll('.services-carousel-section .dot');
        const carouselSection = document.querySelector('.services-carousel-section');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoRotate;
        let isAnimating = false;
        
        // Initialize carousel
        function updateServicesCarousel(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.visibility = i === index ? 'visible' : 'hidden';
                dots[i].classList.remove('active');
                slide.setAttribute('tabindex', i === index ? '0' : '-1');
            });
            
            // Set active slide
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            
            // Set height based on current slide
            const slideHeight = slides[currentIndex].offsetHeight;
            servicesCarousel.style.minHeight = `${slideHeight + 50}px`;
            
            // Allow animation to complete
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }
        
        // Initialize the carousel on page load
        setTimeout(() => {
            updateServicesCarousel(0);
        }, 100);
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            const slideHeight = slides[currentIndex].offsetHeight;
            servicesCarousel.style.minHeight = `${slideHeight + 50}px`;
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;
                
                clearInterval(autoRotate);
                const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateServicesCarousel(newIndex);
                startAutoRotate();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;
                
                clearInterval(autoRotate);
                const newIndex = (currentIndex + 1) % totalSlides;
                updateServicesCarousel(newIndex);
                startAutoRotate();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;
                
                clearInterval(autoRotate);
                updateServicesCarousel(index);
                startAutoRotate();
            });
            
            // Make dots keyboard accessible
            dot.setAttribute('tabindex', '0');
            dot.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isAnimating) return;
                    
                    clearInterval(autoRotate);
                    updateServicesCarousel(index);
                    startAutoRotate();
                }
            });
        });
        
        // Function to start auto rotation
        function startAutoRotate() {
            autoRotate = setInterval(function() {
                if (!document.hidden && !isAnimating) {
                    const newIndex = (currentIndex + 1) % totalSlides;
                    updateServicesCarousel(newIndex);
                }
            }, 10000);
        }
        
        // Start auto-rotation initially
        startAutoRotate();
        
        // Pause auto-rotation when hovering over carousel
        servicesCarousel.addEventListener('mouseenter', function() {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves
        servicesCarousel.addEventListener('mouseleave', function() {
            startAutoRotate();
        });
        
        // Add touch swipe support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        servicesCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoRotate);
        }, { passive: true });
        
        servicesCarousel.addEventListener('touchend', function(e) {
            if (isAnimating) return;
            
            touchEndX = e.changedTouches[0].screenX;
            const xDiff = touchEndX - touchStartX;
            
            // Only detect horizontal swipes
            if (Math.abs(xDiff) > 50) {
                if (xDiff < 0) {
                    // Swipe left, go to next slide
                    const newIndex = (currentIndex + 1) % totalSlides;
                    updateServicesCarousel(newIndex);
                } else {
                    // Swipe right, go to previous slide
                    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    updateServicesCarousel(newIndex);
                }
            }
            
            startAutoRotate();
        }, { passive: true });
        
        // Stop auto-rotation when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(autoRotate);
            } else {
                startAutoRotate();
            }
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Name is required.\n';
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += 'Email is required.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (phone === '') {
                isValid = false;
                errorMessage += 'Phone number is required.\n';
            } else if (!isValidPhone(phone)) {
                isValid = false;
                errorMessage += 'Please enter a valid phone number.\n';
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Message is required.\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
            } else {
                // Form is valid - in a real application, this would submit to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Australian phone number validation
        const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
        return phoneRegex.test(phone);
    }
    
    // Scroll Animation with Back to the Future Styled Reveal
    const revealElements = document.querySelectorAll('.service-item, .feature, .time-point');
    
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = revealElements[i].getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
        .service-item, .feature, .time-point {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            position: relative;
        }
        
        .service-item.active, .feature.active, .time-point.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-item.active::before, .feature.active::before, .time-point.active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(0, 191, 255, 0.1), transparent);
            animation: timeTravel 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes timeTravel {
            0% {
                opacity: 0.7;
                transform: translateX(-100%);
            }
            100% {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img:not([loading])');
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                    }
                    observer.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for elements in view
    revealOnScroll();
}); 
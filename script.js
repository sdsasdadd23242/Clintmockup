// Vac to the Future - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Add nav mobile styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        nav ul.show {
            display: block;
            position: absolute;
            top: 50px;
            left: 0;
            width: 100%;
            background-color: var(--midnight-blue);
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 999;
            border-bottom: 1px solid var(--flux-blue);
        }
        
        nav ul.show li {
            margin: 15px 0;
            text-align: center;
        }
        
        nav ul.show li:last-child {
            margin-top: 25px;
            position: relative;
            padding-top: 15px;
        }
        
        nav ul.show li:last-child:before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 1px;
            background-color: var(--neon-orange);
            opacity: 0.5;
        }
        
        nav ul.show li:last-child a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            margin: 0 auto;
            padding: 10px 20px;
            font-size: 1rem;
        }
        
        nav ul.show::after {
            content: "";
            display: block;
            margin: 20px auto 10px;
            width: 85%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .menu-toggle.active i {
            color: var(--flux-blue);
        }
        
        .mobile-call-button {
            display: block;
            text-align: center;
            padding: 15px 10px;
            margin: 10px auto 20px;
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
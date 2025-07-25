// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typewriter effect
    initTypewriter();

    // Handle contact form submission
    initFormHandling();

    // Smooth scrolling for navigation
    initSmoothScroll();

    // Add scroll effects
    initScrollEffects();
});

// Typewriter Animation
function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter");
    const phrases = ["developer", "front-end developer", "development"];
    let currentPhrase = 0;
    let currentCharacter = 0;
    let isDeleting = false;

    function type() {
        // Current phrase from the array
        const currentText = phrases[currentPhrase];

        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentText.substring(0, currentCharacter - 1);
            currentCharacter--;

            // When deletion is complete
            if (currentCharacter === 0) {
                isDeleting = false;
                // Move to next phrase
                currentPhrase = (currentPhrase + 1) % phrases.length;
                setTimeout(type, 500); // Pause before next phrase
                return;
            }

            setTimeout(type, 100); // Deletion speed
        } else {
            // Typing text
            typewriterElement.textContent = currentText.substring(0, currentCharacter + 1);
            currentCharacter++;

            // When typing is complete
            if (currentCharacter === currentText.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause before starting to delete
                return;
            }

            setTimeout(type, 150); // Typing speed
        }
    }

    // Start the animation
    if (typewriterElement) {
        setTimeout(type, 1000);
    }
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all fields');
                return;
            }

            // Display success message (in a real app, you'd send data to server)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Smooth scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // If mobile nav is open, close it
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }

                    // Calculate position with offset for navbar height
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for background shapes
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        document.querySelector('.shape-1').style.transform = `translate(${scrollPosition * 0.05}px, ${-scrollPosition * 0.05}px)`;
        document.querySelector('.shape-2').style.transform = `translate(${-scrollPosition * 0.03}px, ${scrollPosition * 0.03}px)`;
        document.querySelector('.shape-3').style.transform = `translate(-50%, -50%) rotate(${scrollPosition * 0.02}deg)`;

        // Add background to navbar when scrolling
        const navbar = document.querySelector('.navbar');
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade-in effect for cards when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.carousel-indicator');

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('opacity-50');
            indicator.classList.add('opacity-100');
        } else {
            indicator.classList.remove('opacity-100');
            indicator.classList.add('opacity-50');
        }
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 400) {
        scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollBtn.classList.add('opacity-100');
    } else {
        scrollBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollBtn.classList.remove('opacity-100');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize carousel
updateCarousel();

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.textContent.includes('Add to Cart') || this.textContent.includes('Add')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Adding...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
            }, 1000);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close the mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Theme Toggle (Light/Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.classList.add('fadeIn');
            } else {
                item.style.display = 'none';
                item.classList.remove('fadeIn');
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');
const portfolioImages = document.querySelectorAll('.portfolio-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentImageIndex = 0;

// Array of portfolio items
const portfolioArray = Array.from(portfolioImages);

portfolioArray.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(item);
    });
});

function openLightbox(item) {
    const imgSrc = item.querySelector('img').src;
    const caption = item.querySelector('.portfolio-info h3').innerText;

    lightbox.style.display = 'block';
    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = caption;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == lightbox) {
        lightbox.style.display = 'none';
    }
});

// Lightbox Navigation
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + portfolioArray.length) % portfolioArray.length;
    const prevItem = portfolioArray[currentImageIndex];
    openLightbox(prevItem);
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % portfolioArray.length;
    const nextItem = portfolioArray[currentImageIndex];
    openLightbox(nextItem);
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
}

function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
}

// Initialize Testimonials
showTestimonial(testimonialIndex);

// Auto Slide Testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

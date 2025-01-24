// Mouse Circle Effect
const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

if (mouseCircle && mouseDot) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        mouseCircle.style.transform = `translate(${posX - 15}px, ${posY - 15}px)`;
        mouseDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
    });
}

// Typing Animation
const roles = [
    "Beautiful Websites",
    "Amazing User Experiences",
    "Creative Solutions",
    "Modern Applications"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        charIndex++;
        typingDelay = 200;
    }
    
    typingElement.textContent = currentRole.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeText, typingDelay);
}

// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.nav-links');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on links
    const mobileNavItems = mobileNav.querySelectorAll('a');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

// Stats Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const circle = stat.querySelector('.progress');
        const h3 = stat.querySelector('h3');
        
        if (!circle || !h3) return;

        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        // Calculate circle progress
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                const progress = 1 - (count / target);
                circle.style.strokeDashoffset = progress * circumference;
                h3.textContent = Math.ceil(count) + (h3.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateCount);
            } else {
                circle.style.strokeDashoffset = 0;
                h3.textContent = target + (h3.textContent.includes('%') ? '%' : '+');
            }
        };
        
        updateCount();
    });
}

// Intersection Observer for About Section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    aboutObserver.observe(aboutSection);
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const target = bar.getAttribute('data-progress');
        if (target) {
            bar.style.width = target + '%';
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Trigger specific animations
            if (entry.target.classList.contains('skills')) {
                animateProgressBars();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            // Show all cards if filter is 'all', otherwise check category
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.position = 'relative';
                }, 300);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.position = 'absolute';
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Services Section Animations
function initServicesAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const shine = card.querySelector('.service-bg');
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const shine = card.querySelector('.service-bg');
            if (shine) {
                shine.style.background = '';
            }
        });
    });

    // Feature items stagger animation
    const features = document.querySelectorAll('.service-features li');
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// Initialize services animations when page loads
document.addEventListener('DOMContentLoaded', initServicesAnimations);

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    setTimeout(typeText, newTextDelay);
    
    // Initialize section animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add fade-in animation to project cards
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });

    // Initialize services
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        subject: this.querySelector('input[name="subject"]').value,
        message: this.querySelector('textarea[name="message"]').value
    };

    // Send email using EmailJS
    emailjs.send(
        'service_pil7sdo',
        'template_gll8tv3',
        {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
        }
    ).then(function() {
        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
    }).catch(function(error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('EmailJS Error:', error);
    }).finally(function() {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Form Submission
const contactForm2 = document.querySelector('.contact-form');

if (contactForm2) {
    contactForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm2.querySelector('button');
        if (!button) return;

        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            contactForm2.reset();
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }, 1500);
    });
}
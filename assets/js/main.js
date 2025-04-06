/**
 * Main JavaScript file for the Universe Website
 * Contains shared functionality used across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentLocation.endsWith(itemPath)) {
            item.classList.add('active');
        }
    });

    // Handle card hover effects for better touch device compatibility
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-hover');
        }, { passive: true });
    });
    
    // Character card touch behavior for mobile
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('flipped');
            
            // Prevent other cards from staying flipped
            characterCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('flipped');
                }
            });
        }, { passive: true });
    });
});

// Burger menu toggle animation
function toggleBurger() {
    const burger = document.querySelector('.burger');
    burger.classList.toggle('toggle');
}

// Add CSS class for burger animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .burger.toggle .line2 {
            opacity: 0;
        }
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        .character-card.flipped .card-front {
            transform: rotateY(180deg);
        }
        .character-card.flipped .card-back {
            transform: rotateY(0deg);
        }
        .card.touch-hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
}); 
/**
 * Slideshow Component
 * Controls the slideshow functionality on the multimedia page
 */

let slideIndex = 1;

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshow if it exists on the current page
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
        setupSlideshowControls();
    }
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Show the slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Handle out of bounds indices
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show the current slide and highlight current dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Set up event listeners for slideshow controls
function setupSlideshowControls() {
    // Previous button
    const prevButton = document.querySelector('.prev');
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            plusSlides(-1);
        });
    }
    
    // Next button
    const nextButton = document.querySelector('.next');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            plusSlides(1);
        });
    }
    
    // Dot navigation
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide(index + 1);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        }
    });
    
    // Add swipe functionality for mobile
    setupSwipeControl();
}

// Swipe functionality for mobile devices
function setupSwipeControl() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX) {
            // Swipe left - show next slide
            plusSlides(1);
        } else if (touchEndX > touchStartX) {
            // Swipe right - show previous slide
            plusSlides(-1);
        }
    }
}

// Add CSS for slideshow controls
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .slideshow-container {
            position: relative;
            max-width: 1000px;
            margin: auto;
        }
        
        .slide {
            display: none;
        }
        
        .prev, .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            margin-top: -22px;
            padding: 16px;
            color: white;
            font-weight: bold;
            font-size: 18px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
            user-select: none;
            background-color: rgba(0, 0, 0, 0.3);
        }
        
        .next {
            right: 0;
            border-radius: 3px 0 0 3px;
        }
        
        .prev:hover, .next:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .slide-caption {
            color: #f2f2f2;
            font-size: 15px;
            padding: 8px 12px;
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .dot {
            cursor: pointer;
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.6s ease;
        }
        
        .active, .dot:hover {
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}); 
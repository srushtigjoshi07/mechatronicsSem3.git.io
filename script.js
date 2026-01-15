/**
 * Mimic Me Mirror Project Portfolio - JavaScript
 * Author: Srushti G Joshi (01FE24BAR014)
 * Date: January 2026
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initAnimations();
    initInteractiveElements();
    initScrollEffects();
    initPerformanceCounters();
    initCircuitDiagramInteraction();
    initStepAnimations();
    initProblemSolutionToggler();
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

/**
 * Initialize animation observers for scroll-triggered animations
 */
function initAnimations() {
    // Create intersection observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        fadeObserver.observe(el);
    });
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    // Back link functionality
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.classList.add('clicked');
            
            // Simulate navigation back after animation
            setTimeout(() => {
                // In a real implementation, this would navigate back
                // For demo purposes, just show an alert
                alert('Navigating back to main portfolio...');
                // window.history.back(); // Uncomment for real navigation
            }, 300);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
        });
    }

    // Metadata item hover effects
    const metadataItems = document.querySelectorAll('.metadata-item');
    metadataItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Team card hover effects
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.team-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.team-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.project-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shadow effect
        if (scrollTop > 100) {
            if (header) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                header.style.padding = '80px 0 40px';
            }
        } else {
            if (header) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                header.style.padding = '100px 0 60px';
            }
        }
        
        // Parallax effect for header background
        if (header) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            header.style.backgroundPosition = `center ${rate}px`;
        }
        
        // Update active section based on scroll position
        updateActiveSection();
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

/**
 * Update active section in navigation (if navigation exists)
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update active nav link if navigation exists
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (navLink) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
            
            // Add active class to section
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

/**
 * Animate performance metric counters
 */
function initPerformanceCounters() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target;
                const valueText = metricValue.textContent;
                
                // Extract numeric value
                const match = valueText.match(/(\d+(\.\d+)?)/);
                if (match) {
                    const targetValue = parseFloat(match[0]);
                    const hasSymbol = valueText.includes('%') || valueText.includes('<') || valueText.includes('~');
                    const symbol = hasSymbol ? valueText.replace(match[0], '') : '';
                    
                    // Animate counter
                    animateCounter(metricValue, 0, targetValue, 1500, symbol);
                    
                    // Unobserve after animation
                    counterObserver.unobserve(metricValue);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    metricValues.forEach(value => {
        counterObserver.observe(value);
    });
}

/**
 * Animate a counter from start to end value
 */
function animateCounter(element, start, end, duration, symbol = '') {
    const startTime = performance.now();
    const step = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = start + (end - start) * easeOutQuart;
        
        // Format the value based on type
        let displayValue;
        if (symbol === '%' || element.textContent.includes('%')) {
            displayValue = Math.round(currentValue) + symbol;
        } else if (symbol === '<' || symbol === '~') {
            displayValue = symbol + currentValue.toFixed(1);
        } else {
            displayValue = currentValue.toFixed(1);
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

/**
 * Add interactivity to circuit diagram
 */
function initCircuitDiagramInteraction() {
    const circuitDiagram = document.querySelector('.circuit-diagram');
    const legendItems = document.querySelectorAll('.legend-item');
    
    if (!circuitDiagram) return;
    
    // Add hover effect to legend items that highlights corresponding parts
    legendItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Add active class to this legend item
            this.classList.add('active');
            
            // Highlight corresponding color in the diagram
            const colorClass = `color-${index + 1}`;
            const colorElement = this.querySelector(`.${colorClass}`);
            if (colorElement) {
                colorElement.style.transform = 'scale(1.2)';
                colorElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            }
            
            // Pulse animation for the legend color
            const legendColor = this.querySelector('.legend-color');
            if (legendColor) {
                legendColor.style.animation = 'pulse 1s infinite';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove active class
            this.classList.remove('active');
            
            // Reset color element
            const colorClass = `color-${index + 1}`;
            const colorElement = this.querySelector(`.${colorClass}`);
            if (colorElement) {
                colorElement.style.transform = 'scale(1)';
                colorElement.style.boxShadow = '';
            }
            
            // Stop pulse animation
            const legendColor = this.querySelector('.legend-color');
            if (legendColor) {
                legendColor.style.animation = '';
            }
        });
    });
    
    // Make circuit diagram interactive with click-to-zoom
    circuitDiagram.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        
        if (this.classList.contains('zoomed')) {
            this.style.cursor = 'zoom-out';
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '100';
            this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
            
            // Show zoom hint
           

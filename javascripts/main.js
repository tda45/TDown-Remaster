// TDown Remaster - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const floatingIcons = document.querySelector('.floating-icons');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero && floatingIcons) {
            floatingIcons.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe Download Cards
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue === '∞') {
                    target.style.animation = 'pulse 2s infinite';
                } else {
                    const numericValue = parseInt(finalValue);
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    
                    const updateCounter = () => {
                        currentValue += increment;
                        if (currentValue < numericValue) {
                            target.textContent = Math.floor(currentValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = numericValue;
                        }
                    };
                    
                    updateCounter();
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Theme Toggle (Bonus Feature)
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #ff0000, #cc0000);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') ? 'fas fa-sun' : 'fas fa-moon';
        });
        
        themeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(180deg)';
        });
        
        themeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        document.body.appendChild(themeToggle);
    }
    
    createThemeToggle();
    
    // Add light theme styles
    const lightThemeStyles = document.createElement('style');
    lightThemeStyles.textContent = `
        body.light-theme {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --bg-tertiary: #ffe5e5;
            --text-primary: #cc0000;
            --text-secondary: #ff0000;
            --text-muted: #666666;
            --accent: #ff0000;
            --accent-hover: #cc0000;
            --border: #ffcccc;
        }
        
        body.light-theme .nav-logo i {
            color: var(--accent);
        }
        
        body.light-theme .hero::before {
            opacity: 0.1;
        }
    `;
    document.head.appendChild(lightThemeStyles);
    
    // Copy to Clipboard Functionality
    function addCopyToClipboard() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.className = 'copy-btn';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 0, 0, 0.8);
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s ease;
            `;
            
            const parent = block.parentElement;
            parent.style.position = 'relative';
            parent.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
            
            copyBtn.addEventListener('mouseenter', function() {
                this.style.background = 'var(--accent)';
            });
            
            copyBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 0, 0, 0.8)';
            });
        });
    }
    
    addCopyToClipboard();
    
    // Loading Animation
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <div class="loader-text">🌙 TDown Remaster Yükleniyor...</div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid var(--border);
                border-top: 3px solid var(--accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            .loader-text {
                color: var(--text-primary);
                font-size: 1.2rem;
                font-weight: 600;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
    
    // Show loading animation on page load
    showLoadingAnimation();
    
    // Console Easter Egg
    console.log('%c🌙 TDown Remaster', 'font-size: 20px; font-weight: bold; color: #ff0000;');
    console.log('%c🔥 Gece Modu Geliştirici', 'font-size: 16px; color: #ff3333;');
    console.log('%c💻 Modern Video İndirme Platformu', 'font-size: 14px; color: #ff6666;');
    console.log('%c🚀 https://github.com/tda45/tdown-remaster', 'font-size: 12px; color: #ff9999;');
});

// Performance Optimization
let ticking = false;
function requestTick(callback) {
    if (!ticking) {
        requestAnimationFrame(callback);
        ticking = true;
        setTimeout(() => { ticking = false; }, 100);
    }
}

// Smooth scroll performance
window.addEventListener('scroll', function() {
    requestTick(function() {
        // Scroll-based animations here
    });
});

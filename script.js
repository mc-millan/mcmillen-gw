/* ===========================================
   McMillen World - Swiss Financial Interactivity
   瑞士金融网站交互逻辑
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navigation Scroll Effect
    // 导航栏滚动变色效果
    // ========================================
    const nav = document.getElementById('mainNav');
    
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Check on load
    
    // ========================================
    // Mobile Menu Toggle
    // 移动端菜单切换
    // ========================================
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            if (navMenu.classList.contains('active')) {
                navToggle.textContent = '✕';
            } else {
                navToggle.textContent = '☰';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.textContent = '☰';
            });
        });
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // 平滑滚动锚点定位
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Intersection Observer for Animations
    // 滚动进入视图动画
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // Form Submission Handler
    // 表单提交处理
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (demo)
            alert('Thank you for your inquiry. Our team will contact you shortly.\n\n感谢您的咨询，我们的团队将尽快与您联系。');
            
            // Reset form
            this.reset();
        });
    }
    
    // ========================================
    // Stats Counter Animation
    // 数字计数动画
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stats__number').forEach(stat => {
                        const target = parseInt(stat.dataset.target) || 0;
                        animateCounter(stat, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    console.log('McMillen World - Swiss Financial Platform Initialized');
});

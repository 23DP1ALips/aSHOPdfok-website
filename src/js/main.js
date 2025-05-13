document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('#main-nav a');

    function toggleMenu() {
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    navOverlay.addEventListener('click', closeMenu);
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target)) closeMenu();
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isActive = this.classList.toggle('active');
            
            icon.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0)';
            content.style.maxHeight = isActive ? content.scrollHeight + 'px' : '0';
        });
    });

    const screenshots = document.querySelectorAll('.screenshot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let slideInterval;

    function showScreenshot(index) {
        screenshots.forEach((s, i) => {
            s.classList.toggle('active', i === index);
            if (i === index) {
                s.style.animation = 'fadeIn 0.5s ease';
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % screenshots.length;
        showScreenshot(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
        showScreenshot(currentIndex);
    }

    function startCarousel() {
        slideInterval = setInterval(nextSlide, 10000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startCarousel();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        startCarousel();
    }

    const downloadButtons = document.querySelectorAll('.download-button[href$=".zip"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Download initiated: ' + this.getAttribute('href'));
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        document.querySelectorAll('.fullscreen-section').forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.download-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        function expandCard() {
            card.style.height = '380px';
            card.querySelector('.card-content').style.opacity = '1';
            card.querySelector('.card-content').style.padding = '1.5rem';
        }
        
        function collapseCard() {
            card.style.height = '80px';
            card.querySelector('.card-content').style.opacity = '0';
            card.querySelector('.card-content').style.padding = '0 1.5rem';
        }
        
        card.addEventListener('mouseenter', expandCard);
        card.addEventListener('mouseleave', collapseCard);
        
        card.addEventListener('focus', expandCard);
        card.addEventListener('blur', collapseCard);
    
        card.addEventListener('touchstart', function(e) {
            if (card.style.height === '80px') {
                expandCard();
                e.preventDefault();
            } else {
                collapseCard();
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) closeMenu();
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    });
});
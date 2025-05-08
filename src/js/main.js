document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
    });
    
    // Close menu when clicking overlay or outside
    function closeMenu() {
        mainNav.classList.remove('active');
    }
    
    navOverlay.addEventListener('click', closeMenu);
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && e.target !== mobileMenuToggle) {
            closeMenu();
        }
    });
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                    item.style.maxHeight = null;
                }
            });
            
            // Toggle current
            if (!isActive) {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('.fullscreen-section');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Window resize handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
        }
        
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    });
});
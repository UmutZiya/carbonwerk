// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileMenu);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

// Cart Badge Update Function
function updateCartBadge(count) {
    const cartBadge = document.getElementById('cartBadge');
    const mobileCartBadge = document.getElementById('mobileCartBadge');
    
    if (cartBadge) {
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'flex' : 'none';
    }
    
    if (mobileCartBadge) {
        mobileCartBadge.textContent = count;
        mobileCartBadge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Initialize cart badge
updateCartBadge(0);
// Cart functions for index.html
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart total in header
    const headerCartTotal = document.getElementById('headerCartTotal');
    const cartBadge = document.getElementById('cartBadge');
    const mobileCartBadge = document.getElementById('mobileCartBadge');
    
    if (headerCartTotal) {
        headerCartTotal.textContent = `${cartTotal.toFixed(2)} €`;
    }
    
    if (cartBadge) {
        cartBadge.textContent = cartItemCount;
        cartBadge.style.display = cartItemCount > 0 ? 'flex' : 'none';
    }
    
    if (mobileCartBadge) {
        mobileCartBadge.textContent = cartItemCount;
        mobileCartBadge.style.display = cartItemCount > 0 ? 'flex' : 'none';
    }
}

// Toggle cart dropdown
function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('active');
    updateCartDropdown();
}

// Close cart dropdown
function closeCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.remove('active');
}

// Go to cart page
function goToCart() {
    window.location.href = 'payment.html';
}

// Update cart dropdown content
function updateCartDropdown() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartItemCount = document.getElementById('cartItemCount');
    
    if (!cartItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update item count
    if (cartItemCount) {
        cartItemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h5>Your cart is empty</h5>
                <p>Add some products to get started!</p>
            </div>
        `;
        if (cartTotalPrice) cartTotalPrice.textContent = '0.00 €';
        return;
    }
    
    let cartHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        <span class="cart-item-price">${itemTotal.toFixed(2)} €</span>
                        <span class="cart-item-qty">Qty: ${item.quantity}</span>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(this, ${index})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    if (cartTotalPrice) cartTotalPrice.textContent = total.toFixed(2) + ' €';
}

// Remove item from cart with animation
function removeFromCart(buttonElement, index) {
    const cartItem = buttonElement.closest('.cart-item');
    
    if (cartItem) {
        cartItem.classList.add('removing');
        
        // Wait for the animation to finish
        setTimeout(() => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update header and dropdown without closing it
            updateCartDisplay();
            updateCartDropdown();
        }, 300); // Corresponds to the transition duration in CSS
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartDropdown = document.getElementById('cartDropdown');
    const cartLinks = document.querySelectorAll('.cart-link');
    let isClickInsideCartLink = false;
    cartLinks.forEach(link => {
        if (link.contains(event.target)) {
            isClickInsideCartLink = true;
        }
    });

    if (cartDropdown && !cartDropdown.contains(event.target) && !isClickInsideCartLink) {
        cartDropdown.classList.remove('active');
    }
});

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();

    const cartDropdown = document.getElementById('cartDropdown');
    const desktopCartContainer = document.querySelector('.cart-item');
    const mobileCartContainer = document.querySelector('.mobile-cart-item');

    function moveCartDropdown() {
        if (window.innerWidth < 768) { // Mobile
            if (mobileCartContainer && cartDropdown) {
                mobileCartContainer.appendChild(cartDropdown);
            }
        } else { // Desktop
            if (desktopCartContainer && cartDropdown) {
                desktopCartContainer.appendChild(cartDropdown);
            }
        }
    }

    moveCartDropdown();
    window.addEventListener('resize', moveCartDropdown);
    
    // Mobile cart functionality
    const mobileCartLink = document.querySelector('.mobile-cart-item .cart-link');
    if (mobileCartLink) {
        mobileCartLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
});

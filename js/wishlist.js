document.addEventListener('DOMContentLoaded', () => {
    const wishlistDropdown = document.getElementById('wishlistDropdown');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const wishlistItemCount = document.getElementById('wishlistItemCount');
    const wishlistItemsContainer = document.getElementById('wishlistItems');

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function updateWishlistDropdown() {
        wishlistItemsContainer.innerHTML = '';
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<div class="empty-cart"><h5>Your wishlist is empty</h5><p>Add products to your wishlist to see them here.</p></div>';
            wishlistBadge.style.display = 'none';
        } else {
            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.classList.add('cart-item');
                wishlistItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-details">
                            <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromWishlist('${item.id}')"><i class="fas fa-times"></i></button>
                `;
                wishlistItemsContainer.appendChild(wishlistItem);
            });
            wishlistBadge.style.display = 'flex';
            wishlistBadge.textContent = wishlist.length;
        }
        wishlistItemCount.textContent = `${wishlist.length} items`;
    }

    window.addToWishlist = function(product) {
        if (!wishlist.find(item => item.id === product.id)) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistDropdown();
        }
    }

    window.addToWishlistFromPage = function() {
        const productName = document.querySelector('.product-title').innerText;
        const productCode = document.querySelector('.product-code strong').innerText;
        const priceText = document.querySelector('.price-amount').innerText;
        const productPrice = parseFloat(priceText.replace(',', '.').replace('€', '').trim());
        const productImage = document.getElementById('mainProductImage').src;

        const product = {
            id: productCode,
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToWishlist(product);
    }

    window.removeFromWishlist = function(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistDropdown();
    }

    window.toggleWishlist = function() {
        wishlistDropdown.classList.toggle('active');
    }

    window.closeWishlist = function() {
        wishlistDropdown.classList.remove('active');
    }

    window.goToWishlist = function() {
        // You can create a separate wishlist page and redirect to it
        console.log('Redirecting to wishlist page...');
    }

    document.addEventListener('click', function(event) {
        const wishlistLink = document.getElementById('wishlistLink');
        if (wishlistDropdown && wishlistLink && !wishlistDropdown.contains(event.target) && !wishlistLink.contains(event.target)) {
            wishlistDropdown.classList.remove('active');
        }
    });

    updateWishlistDropdown();
});
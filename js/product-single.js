// Load product data from URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        loadProductById(productId);
    }
});

// Load specific product by ID
function loadProductById(productId) {
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Update page title
        document.title = `${product.name} - May Car Automotive`;
        
        // Update product details on the page
        updateProductDetails(product);
    } else {
        // Product not found, redirect to all products
        window.location.href = 'all-products.html';
    }
}

// Update product details on the page
function updateProductDetails(product) {
    // Update product name
    const titleElements = document.querySelectorAll('.product-title, .product-name');
    titleElements.forEach(el => {
        if (el) el.textContent = product.name;
    });
    
    // Update product code
    const codeElements = document.querySelectorAll('.product-code strong');
    codeElements.forEach(el => {
        if (el) el.textContent = product.code;
    });
    
    // Update price
    const priceElements = document.querySelectorAll('.price-amount');
    priceElements.forEach(el => {
        if (el) el.textContent = `${product.price.toFixed(2)} ${product.currency}`;
    });
    
    // Update badge
    const badgeElements = document.querySelectorAll('.new-badge');
    badgeElements.forEach(el => {
        if (el) el.textContent = product.badge || 'NEW';
    });
    
    // Ensure product.images is an array, fallback to single image if not present
    if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
        product.images = [product.image];
    }

    // Update main product image
    const mainImageElement = document.getElementById('mainProductImage');
    if (mainImageElement) {
        mainImageElement.src = product.images[0];
        mainImageElement.alt = product.name;
        mainImageElement.onclick = () => openLightbox(0); // Open lightbox on main image click
    }

    // Update thumbnail images (no click, only for slider)
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';
        product.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = product.name;
            thumb.classList.add('thumbnail');
            if (index === 0) {
                thumb.classList.add('active');
            }
            // No click event, only navigation with arrows
            thumbnailContainer.appendChild(thumb);
        });
    }
    
    // Update breadcrumb
    if (product.breadcrumb) {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = product.breadcrumb.map((item, index) => {
                if (index === product.breadcrumb.length - 1) {
                    return `<li class="breadcrumb-item active">${item.name}</li>`;
                }
                return `<li class="breadcrumb-item"><a href="${item.url}">${item.name}</a></li>`;
            }).join('');
        }
    }
    
    // Update product description
    if (product.description) {
        const descriptionContainer = document.querySelector('.product-details');
        if (descriptionContainer) {
            descriptionContainer.innerHTML = `
                <h3>${product.description.title}</h3>
                <div class="description-content">
                    <p>${product.description.content}</p>
                    
                    <h4>Features:</h4>
                    <ul>
                        ${product.description.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h4>Specifications:</h4>
                    <div class="specifications">
                        ${product.description.specifications.map(spec => 
                            `<div class="spec-item"><strong>${spec.label}:</strong> ${spec.value}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    }
}

// Lightbox functionality
let slideIndex = 0;
let productImages = []; // This will store all product image URLs


// Slider navigation for thumbnails and main image
window.thumbnailSliderIndex = 0;
window.updateThumbnailSlider = function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainProductImage = document.getElementById('mainProductImage');
    if (!thumbnails.length) return;
    // Clamp index
    if (window.thumbnailSliderIndex < 0) window.thumbnailSliderIndex = 0;
    if (window.thumbnailSliderIndex >= thumbnails.length) window.thumbnailSliderIndex = thumbnails.length - 1;
    // Update main image
    if (mainProductImage) {
        mainProductImage.src = thumbnails[window.thumbnailSliderIndex].src;
        mainProductImage.alt = thumbnails[window.thumbnailSliderIndex].alt;
    }
    // Update active class
    thumbnails.forEach((thumb, idx) => {
        if (idx === window.thumbnailSliderIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
};

window.previousImage = function() {
    window.thumbnailSliderIndex--;
    if (window.thumbnailSliderIndex < 0) window.thumbnailSliderIndex = 0;
    window.updateThumbnailSlider();
};

window.nextImage = function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    window.thumbnailSliderIndex++;
    if (window.thumbnailSliderIndex >= thumbnails.length) window.thumbnailSliderIndex = thumbnails.length - 1;
    window.updateThumbnailSlider();
};

// Scroll thumbnails left/right (for overflow)
window.scrollThumbnails = function(direction) {
    const container = document.querySelector('.thumbnail-container');
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!container || !thumbnails.length) return;
    const scrollAmount = 100;
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        window.thumbnailSliderIndex--;
        if (window.thumbnailSliderIndex < 0) window.thumbnailSliderIndex = 0;
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        window.thumbnailSliderIndex++;
        if (window.thumbnailSliderIndex >= thumbnails.length) window.thumbnailSliderIndex = thumbnails.length - 1;
    }
    window.updateThumbnailSlider();
};

function openLightbox(n) {
    // Populate productImages from current thumbnails
    productImages = Array.from(document.querySelectorAll('.thumbnail')).map(img => img.src);
    if (productImages.length > 0) {
        document.getElementById("productLightbox").style.display = "block";
        showSlides(n);
        // Modal oklarına event ekle (her açılışta güncel olsun)
        const prevBtn = document.querySelector('.prev-lightbox');
        const nextBtn = document.querySelector('.next-lightbox');
        if (prevBtn) prevBtn.onclick = function(e) { e.stopPropagation(); plusSlides(-1); };
        if (nextBtn) nextBtn.onclick = function(e) { e.stopPropagation(); plusSlides(1); };
        // Kapatma için modal arka planına tıklama
        const modal = document.getElementById("productLightbox");
        if (modal) {
            modal.onclick = function(e) {
                if (e.target === modal) closeLightbox();
            };
        }
    }
}

function closeLightbox() {
    document.getElementById("productLightbox").style.display = "none";
}


function plusSlides(n) {
    showSlides(slideIndex + n);
}

function showSlides(n) {
    if (productImages.length === 0) return;
    if (n >= productImages.length) { slideIndex = 0; }
    else if (n < 0) { slideIndex = productImages.length - 1; }
    else { slideIndex = n; }
    document.getElementById("lightboxImage").src = productImages[slideIndex];
}


// Add event listener to main image to open lightbox and initialize slider index
document.addEventListener('DOMContentLoaded', () => {
    const mainProductImage = document.getElementById('mainProductImage');
    if (mainProductImage) {
        mainProductImage.style.cursor = 'pointer';
        mainProductImage.addEventListener('click', () => openLightbox(window.thumbnailSliderIndex));
    }
    // Set initial main image and active thumbnail
    setTimeout(() => {
        window.thumbnailSliderIndex = 0;
        window.updateThumbnailSlider();
    }, 300);
});



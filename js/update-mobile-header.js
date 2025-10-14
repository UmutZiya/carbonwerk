// Script to update all HTML files with mobile header
const fs = require('fs');
const path = require('path');

const files = [
    'contact.html',
    'login.html', 
    'payment.html',
    'product-single-page.html',
    'blog-single-page.html'
];

const oldHeaderPattern = /<div class="col-lg-10 col-md-9 col-6 d-none d-md-flex justify-content-end">\s*<nav class="main-nav">/;
const newHeaderStart = `<div class="col-lg-10 col-md-9 col-6">
                    <nav class="main-nav d-none d-md-flex justify-content-end">`;

const oldMobileToggle = /<div class="mobile-menu-toggle d-md-none">\s*<button class="btn" id="mobileMenuBtn">\s*<i class="fas fa-bars"><\/i>\s*<\/button>\s*<\/div>/;
const newMobileActions = `<div class="mobile-header-actions d-flex d-md-none justify-content-end align-items-center">
                        <div class="mobile-cart-item">
                            <a href="javascript:void(0)" class="cart-link" onclick="toggleCart()">
                                <div class="cart-icon-wrapper">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span class="cart-badge" id="mobileCartBadge">0</span>
                                </div>
                            </a>
                        </div>
                        <div class="mobile-menu-toggle">
                            <button class="btn" id="mobileMenuBtn">
                                <i class="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>`;

files.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update header structure
        content = content.replace(oldHeaderPattern, newHeaderStart);
        content = content.replace(oldMobileToggle, newMobileActions);
        
        // Add cart dropdown CSS if not exists
        if (!content.includes('cart-dropdown.css')) {
            content = content.replace(
                /<link rel="stylesheet" href="\/css\/([^"]+)\.css">/g,
                (match, cssName) => {
                    if (cssName === 'footer') {
                        return match + '\n    <link rel="stylesheet" href="/css/cart-dropdown.css">';
                    }
                    return match;
                }
            );
        }
        
        // Add cart functions script if not exists
        if (!content.includes('cart-functions.js')) {
            content = content.replace(
                /<script src="js\/header\.js"><\/script>/,
                '<script src="js/header.js"></script>\n    <script src="js/cart-functions.js"></script>'
            );
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filename}`);
    }
});

console.log('All files updated successfully!');
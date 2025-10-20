// Customer dropdown menu logic

document.addEventListener('DOMContentLoaded', function() {
    const customerMenuBtn = document.getElementById('customerMenuBtn');
    const customerMenuDropdown = document.getElementById('customerMenuDropdown');

    if (customerMenuBtn && customerMenuDropdown) {
        customerMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            customerMenuDropdown.style.display = (customerMenuDropdown.style.display === 'block') ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!customerMenuBtn.contains(event.target) && !customerMenuDropdown.contains(event.target)) {
                customerMenuDropdown.style.display = 'none';
            }
        });
    }

    // Optionally, add click handlers for dropdown items
    customerMenuDropdown.querySelectorAll('.dropdown-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (item.classList.contains('logout')) {
                // Log out logic here
                window.location.href = 'index.html';
            }
            // My Orders and Account logic can be added here
        });
    });
});

// Sidebar ve içerik geçişleri için JS


document.addEventListener('DOMContentLoaded', function() {
    // Sidebar linkleri
    const sidebarLinks = document.querySelectorAll('.account-sidebar .list-group-item[data-content]');
    const contentSections = document.querySelectorAll('.account-content-section');

    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.add('d-none');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.remove('d-none');
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            showSection(this.getAttribute('data-content'));
        });
    });

    // Sayfa ilk açıldığında My Orders açık
    showSection('orders');

    // --- Personal Info Update ---
  const personalInfoForm = document.getElementById('personalInfoForm');
  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.setItem('personalName', document.getElementById('personalName').value);
      localStorage.setItem('personalEmail', document.getElementById('personalEmail').value);
      localStorage.setItem('personalPhone', document.getElementById('personalPhone').value);
      alert('Personal information updated!');
    });
    if (localStorage.getItem('personalName')) document.getElementById('personalName').value = localStorage.getItem('personalName');
    if (localStorage.getItem('personalEmail')) document.getElementById('personalEmail').value = localStorage.getItem('personalEmail');
    if (localStorage.getItem('personalPhone')) document.getElementById('personalPhone').value = localStorage.getItem('personalPhone');
  }

  // --- Address List & Add ---
  function renderAddresses() {
    const addressList = document.getElementById('addressList');
    let addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    addressList.innerHTML = '';
    addresses.forEach((address, idx) => {
      const div = document.createElement('div');
      div.className = 'address-info d-flex justify-content-between align-items-center mb-2';
      div.innerHTML = `<span>${address}</span><button class='btn btn-sm btn-outline-danger' data-idx='${idx}'>Delete</button>`;
      addressList.appendChild(div);
    });
    addressList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function() {
        addresses.splice(this.getAttribute('data-idx'), 1);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        renderAddresses();
      });
    });
  }
  renderAddresses();

  const addAddressForm = document.getElementById('addAddressForm');
  if (addAddressForm) {
    addAddressForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const val = document.getElementById('newAddress').value.trim();
      if (val) {
        let addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
        addresses.push(val);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        document.getElementById('newAddress').value = '';
        renderAddresses();
      }
    });
  }

  // --- Credit Card List & Add ---
  function renderCards() {
    const cardList = document.getElementById('cardList');
    let cards = JSON.parse(localStorage.getItem('creditCards') || '[]');
    cardList.innerHTML = '';
    cards.forEach((card, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-item d-flex justify-content-between align-items-center mb-2';
      div.innerHTML = `
        <div>
          <span class='fw-bold'>${card.cardHolder}</span>
          <span class='ms-2'>${card.cardNumber.replace(/.(?=.{4})/g, '*')}</span>
          <span class='ms-2 text-muted'>${card.cardExpiry}</span>
        </div>
        <button class='btn btn-sm btn-outline-danger ms-2' data-idx='${idx}'>Delete</button>
      `;
      cardList.appendChild(div);
    });
    cardList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function() {
        cards.splice(this.getAttribute('data-idx'), 1);
        localStorage.setItem('creditCards', JSON.stringify(cards));
        renderCards();
      });
    });
  }
  renderCards();

  const addCreditCardForm = document.getElementById('addCreditCardForm');
  if (addCreditCardForm) {
    addCreditCardForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const cardHolder = document.getElementById('cardHolderName').value.trim();
      const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
      const cardExpiry = document.getElementById('cardExpiry').value.trim();
      const cardCVV = document.getElementById('cardCVV').value.trim();
      if (cardHolder && cardNumber.length >= 12 && cardExpiry && cardCVV) {
        let cards = JSON.parse(localStorage.getItem('creditCards') || '[]');
        cards.push({ cardHolder, cardNumber, cardExpiry, cardCVV });
        localStorage.setItem('creditCards', JSON.stringify(cards));
        document.getElementById('cardHolderName').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('cardExpiry').value = '';
        document.getElementById('cardCVV').value = '';
        renderCards();
      } else {
        alert('Please fill all fields correctly.');
      }
    });
  }
});

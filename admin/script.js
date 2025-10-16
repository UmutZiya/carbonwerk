// Data Storage
class DataStore {
  constructor() {
    this.brands = this.load("brands") || []
    this.models = this.load("models") || []
    this.versions = this.load("versions") || []
    this.generations = this.load("generations") || []
    this.types = this.load("types") || []
    this.products = this.load("products") || []
    this.orders = this.load("orders") || []

    if (this.orders.length === 0) {
      this.initializeSampleOrders()
    } else {
      this.initializeSampleCustomers()
    }
  }

  load(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  addBrand(name) {
    const brand = { id: Date.now(), name }
    this.brands.push(brand)
    this.save("brands", this.brands)
    return brand
  }

  addModel(brandId, name) {
    const model = { id: Date.now(), brandId, name }
    this.models.push(model)
    this.save("models", this.models)
    return model
  }

  addVersion(brandId, modelId, name) {
    const version = { id: Date.now(), brandId, modelId, name }
    this.versions.push(version)
    this.save("versions", this.versions)
    return version
  }

  addGeneration(brandId, modelId, versionId, name) {
    const generation = { id: Date.now(), brandId, modelId, versionId, name }
    this.generations.push(generation)
    this.save("generations", this.generations)
    return generation
  }

  addType(brandId, modelId, versionId, generationId, name) {
    const type = { id: Date.now(), brandId, modelId, versionId, generationId, name }
    this.types.push(type)
    this.save("types", this.types)
    return type
  }

  addProduct(productData) {
    const product = { id: Date.now(), ...productData }
    this.products.push(product)
    this.save("products", this.products)
    return product
  }

  deleteBrand(id) {
    this.brands = this.brands.filter((b) => b.id !== id)
    this.save("brands", this.brands)
  }

  deleteModel(id) {
    this.models = this.models.filter((m) => m.id !== id)
    this.save("models", this.models)
  }

  deleteVersion(id) {
    this.versions = this.versions.filter((v) => v.id !== id)
    this.save("versions", this.versions)
  }

  deleteGeneration(id) {
    this.generations = this.generations.filter((g) => g.id !== id)
    this.save("generations", this.generations)
  }

  deleteType(id) {
    this.types = this.types.filter((t) => t.id !== id)
    this.save("types", this.types)
  }

  deleteProduct(id) {
    this.products = this.products.filter((p) => p.id !== id)
    this.save("products", this.products)
  }

  getModelsByBrand(brandId) {
    return this.models.filter((m) => m.brandId === Number.parseInt(brandId))
  }

  getVersionsByModel(modelId) {
    return this.versions.filter((v) => v.modelId === Number.parseInt(modelId))
  }

  getGenerationsByVersion(versionId) {
    return this.generations.filter((g) => g.versionId === Number.parseInt(versionId))
  }

  getTypesByGeneration(generationId) {
    return this.types.filter((t) => t.generationId === Number.parseInt(generationId))
  }

  getBrandById(id) {
    return this.brands.find((b) => b.id === Number.parseInt(id))
  }

  getModelById(id) {
    return this.models.find((m) => m.id === Number.parseInt(id))
  }

  getVersionById(id) {
    return this.versions.find((v) => v.id === Number.parseInt(id))
  }

  getGenerationById(id) {
    return this.generations.find((g) => g.id === Number.parseInt(id))
  }

  getTypeById(id) {
    return this.types.find((t) => t.id === Number.parseInt(id))
  }

  updateProduct(id, productData) {
    const index = this.products.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.products[index] = { id, ...productData }
      this.save("products", this.products)
      return this.products[index]
    }
    return null
  }

  getProductById(id) {
    return this.products.find((p) => p.id === id)
  }

  updateStock(id, stock) {
    const product = this.products.find((p) => p.id === id)
    if (product) {
      product.stock = stock
      this.save("products", this.products)
      return product
    }
    return null
  }

  addOrder(orderData) {
    const order = { id: Date.now(), ...orderData }
    this.orders.push(order)
    this.save("orders", this.orders)
    return order
  }

  deleteOrder(id) {
    this.orders = this.orders.filter((o) => o.id !== id)
    this.save("orders", this.orders)
  }

  updateOrder(id, orderData) {
    const index = this.orders.findIndex((o) => o.id === id)
    if (index !== -1) {
      this.orders[index] = { id, ...orderData }
      this.save("orders", this.orders)
      return this.orders[index]
    }
    return null
  }

  getOrderById(id) {
    return this.orders.find((o) => o.id === id)
  }

  initializeSampleOrders() {
    const sampleOrders = [
      {
        id: Date.now() - 5000,
        orderNumber: "ORD-2024-001",
        productName: "Fren Diski",
        orderDate: "2024-01-15",
        price: 1250.0,
        paymentStatus: "paid",
        orderStatus: "delivered",
        customerId: 1
      },
      {
        id: Date.now() - 4000,
        orderNumber: "ORD-2024-002",
        productName: "Motor Yağı",
        orderDate: "2024-01-16",
        price: 450.0,
        paymentStatus: "paid",
        orderStatus: "shipped",
        customerId: 2
      },
      {
        id: Date.now() - 3000,
        orderNumber: "ORD-2024-003",
        productName: "Hava Filtresi",
        orderDate: "2024-01-17",
        price: 320.0,
        paymentStatus: "pending",
        orderStatus: "preparing",
        customerId: 3
      },
      {
        id: Date.now() - 2000,
        orderNumber: "ORD-2024-004",
        productName: "Ön Tampon",
        orderDate: "2024-01-18",
        price: 3500.0,
        paymentStatus: "paid",
        orderStatus: "preparing",
        customerId: 1
      },
      {
        id: Date.now() - 1000,
        orderNumber: "ORD-2024-005",
        productName: "Silecek Takımı",
        orderDate: "2024-01-19",
        price: 180.0,
        paymentStatus: "failed",
        orderStatus: "preparing",
        customerId: 4
      },
    ]

    this.orders = sampleOrders
    this.save("orders", this.orders)
    
    // Örnek müşteri verilerini de ekle
    this.initializeSampleCustomers()
  }

  initializeSampleCustomers() {
    const customers = this.load("customers")
    if (!customers || customers.length === 0) {
      const sampleCustomers = [
        {
          id: 1,
          firstName: "Ahmet",
          lastName: "Yılmaz",
          phone: "0532 123 45 67",
          email: "ahmet.yilmaz@email.com",
          address: "Atatürk Mah. Cumhuriyet Cad. No:15 Kadıköy/İstanbul",
          registrationDate: "2024-01-10",
          totalOrders: 2,
          totalSpent: 4750.0
        },
        {
          id: 2,
          firstName: "Fatma",
          lastName: "Demir",
          phone: "0541 987 65 43",
          email: "fatma.demir@email.com",
          address: "Bahçelievler Mah. İnönü Sok. No:8 Ankara",
          registrationDate: "2024-01-12",
          totalOrders: 1,
          totalSpent: 450.0
        },
        {
          id: 3,
          firstName: "Mehmet",
          lastName: "Kaya",
          phone: "0555 111 22 33",
          email: "mehmet.kaya@email.com",
          address: "Çankaya Mah. Atatürk Bulvarı No:45 İzmir",
          registrationDate: "2024-01-14",
          totalOrders: 1,
          totalSpent: 320.0
        },
        {
          id: 4,
          firstName: "Ayşe",
          lastName: "Özkan",
          phone: "0533 444 55 66",
          email: "ayse.ozkan@email.com",
          address: "Merkez Mah. Gazi Cad. No:23 Bursa",
          registrationDate: "2024-01-16",
          totalOrders: 1,
          totalSpent: 180.0
        },
        {
          id: 5,
          firstName: "Ali",
          lastName: "Çelik",
          phone: "0544 777 88 99",
          email: "ali.celik@email.com",
          address: "Yenişehir Mah. Barış Sok. No:12 Antalya",
          registrationDate: "2024-01-18",
          totalOrders: 0,
          totalSpent: 0.0
        }
      ]
      
      this.save("customers", sampleCustomers)
    }
  }

  // Müşteri yönetimi metodları
  getCustomers() {
    return this.load("customers") || []
  }

  getCustomerById(id) {
    const customers = this.getCustomers()
    return customers.find(c => c.id === Number.parseInt(id))
  }

  getCustomerOrders(customerId) {
    return this.orders.filter(order => order.customerId === Number.parseInt(customerId))
  }

  deleteCustomer(id) {
    const customers = this.getCustomers().filter(c => c.id !== Number.parseInt(id))
    this.save("customers", customers)
  }

  // Cash Management Methods
  addIncome(incomeData) {
    const income = { id: Date.now(), type: 'income', ...incomeData }
    const incomes = this.load('incomes') || []
    incomes.push(income)
    this.save('incomes', incomes)
    return income
  }

  addExpense(expenseData) {
    const expense = { id: Date.now(), type: 'expense', ...expenseData }
    const expenses = this.load('expenses') || []
    expenses.push(expense)
    this.save('expenses', expenses)
    return expense
  }

  getIncomes() {
    return this.load('incomes') || []
  }

  getExpenses() {
    return this.load('expenses') || []
  }

  deleteIncome(id) {
    const incomes = this.getIncomes().filter(i => i.id !== id)
    this.save('incomes', incomes)
  }

  deleteExpense(id) {
    const expenses = this.getExpenses().filter(e => e.id !== id)
    this.save('expenses', expenses)
  }

  getTotalIncome() {
    return this.getIncomes().reduce((total, income) => total + income.amount, 0)
  }

  getTotalExpense() {
    return this.getExpenses().reduce((total, expense) => total + expense.amount, 0)
  }

  getNetProfit() {
    return this.getTotalIncome() - this.getTotalExpense()
  }
}

const store = new DataStore()

// Müşteri listesi render fonksiyonu
function renderCustomersList() {
  const customers = store.getCustomers()
  const tbody = document.getElementById("customers-list-table")
  
  if (customers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">Henüz müşteri kaydı yok</td></tr>'
    return
  }
  
  tbody.innerHTML = customers.map(customer => `
    <tr>
      <td>${customer.firstName} ${customer.lastName}</td>
      <td>${customer.phone}</td>
      <td>${customer.email}</td>
      <td>
        <button class="btn btn-edit" onclick="viewCustomerDetail(${customer.id})">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="currentColor"/>
            <path d="M8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
          </svg>
          Detay
        </button>
        <button class="btn btn-danger" onclick="deleteCustomer(${customer.id})" style="margin-left: 8px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 1.152l.557 10.056A2 2 0 0 0 5.046 16h5.908a2 2 0 0 0 1.993-1.792l.557-10.056a.58.58 0 0 0-.01-1.152H11Z" fill="currentColor"/>
          </svg>
          Sil
        </button>
      </td>
    </tr>
  `).join('')
}

// Müşteri detayını göster
function viewCustomerDetail(customerId) {
  const customer = store.getCustomerById(customerId)
  const customerOrders = store.getCustomerOrders(customerId)
  
  if (!customer) {
    alert('Müşteri bulunamadı!')
    return
  }
  
  const content = document.getElementById('customer-detail-content')
  
  const ordersHtml = customerOrders.length > 0 ? 
    customerOrders.map(order => `
      <div class="order-detail-row">
        <span class="order-detail-label">${order.orderNumber}</span>
        <span class="order-detail-value">${order.productName} - ₺${order.price.toFixed(2)}</span>
      </div>
    `).join('') : 
    '<div class="order-detail-row"><span class="order-detail-value">Henüz sipariş yok</span></div>'
  
  content.innerHTML = `
    <div class="order-detail-row">
      <span class="order-detail-label">Ad Soyad:</span>
      <span class="order-detail-value">${customer.firstName} ${customer.lastName}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Telefon:</span>
      <span class="order-detail-value">${customer.phone}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">E-posta:</span>
      <span class="order-detail-value">${customer.email}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Adres:</span>
      <span class="order-detail-value">${customer.address}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Kayıt Tarihi:</span>
      <span class="order-detail-value">${customer.registrationDate}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Toplam Sipariş:</span>
      <span class="order-detail-value">${customer.totalOrders} adet</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Toplam Harcama:</span>
      <span class="order-detail-value">₺${customer.totalSpent.toFixed(2)}</span>
    </div>
    <div class="order-detail-row" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid var(--border-color);">
      <span class="order-detail-label" style="font-size: 16px; font-weight: 600;">Sipariş Edilen Ürünler:</span>
    </div>
    ${ordersHtml}
  `
  
  document.getElementById('customer-detail-modal').classList.add('active')
}

// Müşteri detay modalını kapat
function closeCustomerDetailModal() {
  document.getElementById('customer-detail-modal').classList.remove('active')
}

// Müşteri sil
function deleteCustomer(customerId) {
  const customer = store.getCustomerById(customerId)
  if (!customer) {
    alert('Müşteri bulunamadı!')
    return
  }
  
  if (confirm(`${customer.firstName} ${customer.lastName} adlı müşteriyi silmek istediğinizden emin misiniz?`)) {
    store.deleteCustomer(customerId)
    renderCustomersList()
    alert('Müşteri başarıyla silindi!')
  }
}

let productImages = []
let editProductImages = []

// Navigation
document.querySelectorAll(".nav-item").forEach((item) => {
  if (!item.classList.contains("nav-dropdown-toggle")) {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const page = item.dataset.page

      document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"))
      document.querySelectorAll(".nav-dropdown-item").forEach((nav) => nav.classList.remove("active"))
      item.classList.add("active")

      document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"))
      document.getElementById(`${page}-page`).classList.add("active")

      if (page === "dashboard") {
        updateDashboard()
      } else if (page === "categories") {
        renderAllCategories()
      } else if (page === "product-list") {
        renderProductsList()
      } else if (page === "stock-management") {
        renderStockManagement()
      } else if (page === "orders") {
        renderOrdersList()
      } else if (page === "cash-management") {
        renderCashManagement()
      } else if (page === "customers") {
        renderCustomersList()
      }
    })
  }
})

// Dropdown toggle functionality
document.querySelector(".nav-dropdown-toggle").addEventListener("click", (e) => {
  e.preventDefault()
  const dropdown = document.querySelector(".nav-dropdown")
  dropdown.classList.toggle("open")
})

// Dropdown item navigation
document.querySelectorAll(".nav-dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()
    const page = item.dataset.page

    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"))
    document.querySelectorAll(".nav-dropdown-item").forEach((nav) => nav.classList.remove("active"))
    item.classList.add("active")

    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"))
    document.getElementById(`${page}-page`).classList.add("active")

    if (page === "product-add") {
      populateProductFormSelects()
    } else if (page === "product-list") {
      renderProductsList()
    }
  })
})

// Category Tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category

    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    document.querySelectorAll(".category-tab-content").forEach((content) => {
      content.classList.remove("active")
    })
    document.querySelector(`.category-tab-content[data-category="${category}"]`).classList.add("active")

    renderCategory(category)
  })
})

// Brand Form
let brandInputCount = 1
document.getElementById("brand-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const inputs = document.querySelectorAll(".brand-input")
  let added = 0

  inputs.forEach((input) => {
    const name = input.value.trim()
    if (name) {
      store.addBrand(name)
      added++
    }
  })

  if (added > 0) {
    // Reset form
    document.getElementById("brand-inputs-container").innerHTML = `
      <div class="dynamic-input-group">
        <div class="form-group">
          <label for="brand-name-0">Marka Adı</label>
          <input type="text" id="brand-name-0" class="brand-input" placeholder="Örn: BMW, Mercedes, Audi" required>
        </div>
        <button type="button" class="btn btn-secondary add-input-btn" onclick="addBrandInput()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Ekle
        </button>
      </div>
    `
    brandInputCount = 1
    renderCategory("brand")
    updateAllSelects()
    alert(`${added} marka başarıyla eklendi!`)
  }
})

function addBrandInput() {
  const container = document.getElementById("brand-inputs-container")
  const newInput = document.createElement("div")
  newInput.className = "dynamic-input-group"
  newInput.innerHTML = `
    <div class="form-group">
      <label for="brand-name-${brandInputCount}">Marka Adı</label>
      <input type="text" id="brand-name-${brandInputCount}" class="brand-input" placeholder="Örn: BMW, Mercedes, Audi">
    </div>
    <button type="button" class="btn btn-secondary add-input-btn" onclick="addBrandInput()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Ekle
    </button>
    <button type="button" class="remove-input-btn" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `
  container.appendChild(newInput)
  brandInputCount++
}

// Model Form
let modelInputCount = 1
document.getElementById("model-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const brandId = document.getElementById("model-brand").value
  const inputs = document.querySelectorAll(".model-input")
  let added = 0

  if (brandId) {
    inputs.forEach((input) => {
      const name = input.value.trim()
      if (name) {
        store.addModel(Number.parseInt(brandId), name)
        added++
      }
    })

    if (added > 0) {
      // Reset inputs
      document.getElementById("model-inputs-container").innerHTML = `
        <div class="dynamic-input-group">
          <div class="form-group">
            <label for="model-name-0">Model Adı</label>
            <input type="text" id="model-name-0" class="model-input" placeholder="Örn: 3 Series, E-Class" required>
          </div>
          <button type="button" class="btn btn-secondary add-input-btn" onclick="addModelInput()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ekle
          </button>
        </div>
      `
      modelInputCount = 1
      renderCategory("model")
      updateAllSelects()
      alert(`${added} model başarıyla eklendi!`)
    }
  }
})

function addModelInput() {
  const container = document.getElementById("model-inputs-container")
  const newInput = document.createElement("div")
  newInput.className = "dynamic-input-group"
  newInput.innerHTML = `
    <div class="form-group">
      <label for="model-name-${modelInputCount}">Model Adı</label>
      <input type="text" id="model-name-${modelInputCount}" class="model-input" placeholder="Örn: 3 Series, E-Class">
    </div>
    <button type="button" class="btn btn-secondary add-input-btn" onclick="addModelInput()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Ekle
    </button>
    <button type="button" class="remove-input-btn" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `
  container.appendChild(newInput)
  modelInputCount++
}

// Version Form
let versionInputCount = 1
document.getElementById("version-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const brandId = document.getElementById("version-brand").value
  const modelId = document.getElementById("version-model").value
  const inputs = document.querySelectorAll(".version-input")
  let added = 0

  if (brandId && modelId) {
    inputs.forEach((input) => {
      const name = input.value.trim()
      if (name) {
        store.addVersion(Number.parseInt(brandId), Number.parseInt(modelId), name)
        added++
      }
    })

    if (added > 0) {
      document.getElementById("version-inputs-container").innerHTML = `
        <div class="dynamic-input-group">
          <div class="form-group">
            <label for="version-name-0">Versiyon Adı</label>
            <input type="text" id="version-name-0" class="version-input" placeholder="Örn: 320i, 330d" required>
          </div>
          <button type="button" class="btn btn-secondary add-input-btn" onclick="addVersionInput()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ekle
          </button>
        </div>
      `
      versionInputCount = 1
      renderCategory("version")
      updateAllSelects()
      alert(`${added} versiyon başarıyla eklendi!`)
    }
  }
})

function addVersionInput() {
  const container = document.getElementById("version-inputs-container")
  const newInput = document.createElement("div")
  newInput.className = "dynamic-input-group"
  newInput.innerHTML = `
    <div class="form-group">
      <label for="version-name-${versionInputCount}">Versiyon Adı</label>
      <input type="text" id="version-name-${versionInputCount}" class="version-input" placeholder="Örn: 320i, 330d">
    </div>
    <button type="button" class="btn btn-secondary add-input-btn" onclick="addVersionInput()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Ekle
    </button>
    <button type="button" class="remove-input-btn" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `
  container.appendChild(newInput)
  versionInputCount++
}

// Generation Form
let generationInputCount = 1
document.getElementById("generation-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const brandId = document.getElementById("generation-brand").value
  const modelId = document.getElementById("generation-model").value
  const versionId = document.getElementById("generation-version").value
  const inputs = document.querySelectorAll(".generation-input")
  let added = 0

  if (brandId && modelId && versionId) {
    inputs.forEach((input) => {
      const name = input.value.trim()
      if (name) {
        store.addGeneration(Number.parseInt(brandId), Number.parseInt(modelId), Number.parseInt(versionId), name)
        added++
      }
    })

    if (added > 0) {
      document.getElementById("generation-inputs-container").innerHTML = `
        <div class="dynamic-input-group">
          <div class="form-group">
            <label for="generation-name-0">Jenerasyon Adı</label>
            <input type="text" id="generation-name-0" class="generation-input" placeholder="Örn: F30, G20" required>
          </div>
          <button type="button" class="btn btn-secondary add-input-btn" onclick="addGenerationInput()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ekle
          </button>
        </div>
      `
      generationInputCount = 1
      renderCategory("generation")
      updateAllSelects()
      alert(`${added} jenerasyon başarıyla eklendi!`)
    }
  }
})

function addGenerationInput() {
  const container = document.getElementById("generation-inputs-container")
  const newInput = document.createElement("div")
  newInput.className = "dynamic-input-group"
  newInput.innerHTML = `
    <div class="form-group">
      <label for="generation-name-${generationInputCount}">Jenerasyon Adı</label>
      <input type="text" id="generation-name-${generationInputCount}" class="generation-input" placeholder="Örn: F30, G20">
    </div>
    <button type="button" class="btn btn-secondary add-input-btn" onclick="addGenerationInput()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Ekle
    </button>
    <button type="button" class="remove-input-btn" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `
  container.appendChild(newInput)
  generationInputCount++
}

// Type Form
let typeInputCount = 1
document.getElementById("type-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const brandId = document.getElementById("type-brand").value
  const modelId = document.getElementById("type-model").value
  const versionId = document.getElementById("type-version").value
  const generationId = document.getElementById("type-generation").value
  const inputs = document.querySelectorAll(".type-input")
  let added = 0

  if (brandId && modelId && versionId && generationId) {
    inputs.forEach((input) => {
      const name = input.value.trim()
      if (name) {
        store.addType(
          Number.parseInt(brandId),
          Number.parseInt(modelId),
          Number.parseInt(versionId),
          Number.parseInt(generationId),
          name,
        )
        added++
      }
    })

    if (added > 0) {
      document.getElementById("type-inputs-container").innerHTML = `
        <div class="dynamic-input-group">
          <div class="form-group">
            <label for="type-name-0">Tip Adı</label>
            <input type="text" id="type-name-0" class="type-input" placeholder="Örn: Sedan, Coupe" required>
          </div>
          <button type="button" class="btn btn-secondary add-input-btn" onclick="addTypeInput()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ekle
          </button>
        </div>
      `
      typeInputCount = 1
      renderCategory("type")
      alert(`${added} tip başarıyla eklendi!`)
    }
  }
})

function addTypeInput() {
  const container = document.getElementById("type-inputs-container")
  const newInput = document.createElement("div")
  newInput.className = "dynamic-input-group"
  newInput.innerHTML = `
    <div class="form-group">
      <label for="type-name-${typeInputCount}">Tip Adı</label>
      <input type="text" id="type-name-${typeInputCount}" class="type-input" placeholder="Örn: Sedan, Coupe">
    </div>
    <button type="button" class="btn btn-secondary add-input-btn" onclick="addTypeInput()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Ekle
    </button>
    <button type="button" class="remove-input-btn" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `
  container.appendChild(newInput)
  typeInputCount++
}

// Product Form
document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const isNew = document.getElementById("product-new").checked
  const isBestseller = document.getElementById("product-bestseller").checked
  const productStatus = []
  if (isNew) productStatus.push("new")
  if (isBestseller) productStatus.push("bestseller")

  const productData = {
    name: document.getElementById("product-name").value.trim(),
    brandId: Number.parseInt(document.getElementById("product-brand").value),
    modelId: Number.parseInt(document.getElementById("product-model").value),
    versionId: Number.parseInt(document.getElementById("product-version").value),
    generationId: Number.parseInt(document.getElementById("product-generation").value),
    typeId: Number.parseInt(document.getElementById("product-type").value),
    price: Number.parseFloat(document.getElementById("product-price").value),
    description: document.getElementById("product-description").value.trim(),
    stock: Number.parseInt(document.getElementById("product-stock").value) || 0,
    images: productImages,
    status: productStatus, // Added status field
  }

  store.addProduct(productData)
  document.getElementById("product-form").reset()
  document.getElementById("product-model").disabled = true
  document.getElementById("product-version").disabled = true
  document.getElementById("product-generation").disabled = true
  document.getElementById("product-type").disabled = true

  productImages = []
  document.getElementById("image-preview").innerHTML = ""

  alert("Ürün başarıyla eklendi!")
})

// Image upload handling for product form
document.getElementById("product-images").addEventListener("change", (e) => {
  const files = e.target.files
  const preview = document.getElementById("image-preview")

  Array.from(files).forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      productImages.push(event.target.result)
      renderImagePreview(productImages, preview, "product")
    }
    reader.readAsDataURL(file)
  })
})

// Image upload handling for edit form
document.getElementById("edit-product-images").addEventListener("change", (e) => {
  const files = e.target.files
  const preview = document.getElementById("edit-image-preview")

  Array.from(files).forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      editProductImages.push(event.target.result)
      renderImagePreview(editProductImages, preview, "edit")
    }
    reader.readAsDataURL(file)
  })
})

// Image preview rendering function
function renderImagePreview(images, container, type) {
  container.innerHTML = images
    .map(
      (img, index) => `
    <div class="image-preview-item">
      <img src="${img}" alt="Preview ${index + 1}">
      <button type="button" class="image-preview-remove" onclick="removeImage(${index}, '${type}')">&times;</button>
    </div>
  `,
    )
    .join("")
}

// Remove image function
function removeImage(index, type) {
  if (type === "product") {
    productImages.splice(index, 1)
    const preview = document.getElementById("image-preview")
    renderImagePreview(productImages, preview, "product")
  } else if (type === "edit") {
    editProductImages.splice(index, 1)
    const preview = document.getElementById("edit-image-preview")
    renderImagePreview(editProductImages, preview, "edit")
  }
}

// Edit product form submission
document.getElementById("edit-product-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const productId = Number.parseInt(document.getElementById("edit-product-id").value)
  const productData = {
    name: document.getElementById("edit-product-name").value.trim(),
    brandId: Number.parseInt(document.getElementById("edit-product-brand").value),
    modelId: Number.parseInt(document.getElementById("edit-product-model").value),
    versionId: Number.parseInt(document.getElementById("edit-product-version").value),
    generationId: Number.parseInt(document.getElementById("edit-product-generation").value),
    typeId: Number.parseInt(document.getElementById("edit-product-type").value),
    price: Number.parseFloat(document.getElementById("edit-product-price").value),
    description: document.getElementById("edit-product-description").value.trim(),
    stock: Number.parseInt(document.getElementById("edit-product-stock").value) || 0,
    images: editProductImages,
  }

  store.updateProduct(productId, productData)
  closeEditModal()
  renderProductsList()
  renderStockManagement()
  updateDashboard()

  alert("Ürün başarıyla güncellendi!")
})

// Stock edit form submission
document.getElementById("edit-stock-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const productId = Number.parseInt(document.getElementById("stock-product-id").value)
  const stock = Number.parseInt(document.getElementById("stock-quantity").value)

  store.updateStock(productId, stock)
  closeStockEditModal()
  renderStockManagement()
  updateDashboard()

  alert("Stok başarıyla güncellendi!")
})

document.getElementById("edit-order-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const orderId = Number.parseInt(document.getElementById("order-id").value)
  const order = store.getOrderById(orderId)

  if (order) {
    const orderData = {
      ...order,
      paymentStatus: document.getElementById("order-payment-status").value,
      orderStatus: document.getElementById("order-status").value,
    }

    store.updateOrder(orderId, orderData)
    closeOrderEditModal()
    renderOrdersList()

    alert("Sipariş başarıyla güncellendi!")
  }
})

// Cascading Selects for Version Form
document.getElementById("version-brand").addEventListener("change", (e) => {
  const brandId = e.target.value
  const modelSelect = document.getElementById("version-model")

  modelSelect.innerHTML = '<option value="">Model seçin...</option>'

  if (brandId) {
    const models = store.getModelsByBrand(brandId)
    models.forEach((model) => {
      const option = document.createElement("option")
      option.value = model.id
      option.textContent = model.name
      modelSelect.appendChild(option)
    })
    modelSelect.disabled = false
  } else {
    modelSelect.disabled = true
  }
})

document.getElementById("version-model").addEventListener("change", (e) => {
  const modelId = e.target.value
  const versionSelect = document.getElementById("version-version")

  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'

  if (modelId) {
    const versions = store.getVersionsByModel(modelId)
    versions.forEach((version) => {
      const option = document.createElement("option")
      option.value = version.id
      option.textContent = version.name
      versionSelect.appendChild(option)
    })
    versionSelect.disabled = false
  } else {
    versionSelect.disabled = true
  }
})

// Cascading Selects for Generation Form
document.getElementById("generation-brand").addEventListener("change", (e) => {
  const brandId = e.target.value
  const modelSelect = document.getElementById("generation-model")
  const versionSelect = document.getElementById("generation-version")

  modelSelect.innerHTML = '<option value="">Model seçin...</option>'
  versionSelect.innerHTML = '<option value="">Önce model seçin...</option>'
  versionSelect.disabled = true

  if (brandId) {
    const models = store.getModelsByBrand(brandId)
    models.forEach((model) => {
      const option = document.createElement("option")
      option.value = model.id
      option.textContent = model.name
      modelSelect.appendChild(option)
    })
    modelSelect.disabled = false
  } else {
    modelSelect.disabled = true
  }
})

document.getElementById("generation-model").addEventListener("change", (e) => {
  const modelId = e.target.value
  const versionSelect = document.getElementById("generation-version")

  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'

  if (modelId) {
    const versions = store.getVersionsByModel(modelId)
    versions.forEach((version) => {
      const option = document.createElement("option")
      option.value = version.id
      option.textContent = version.name
      versionSelect.appendChild(option)
    })
    versionSelect.disabled = false
  } else {
    versionSelect.disabled = true
  }
})

document.getElementById("generation-version").addEventListener("change", (e) => {
  const versionId = e.target.value
  const generationSelect = document.getElementById("generation-generation")

  generationSelect.innerHTML = '<option value="">Jenerasyon seçin...</option>'

  if (versionId) {
    const generations = store.getGenerationsByVersion(versionId)
    generations.forEach((generation) => {
      const option = document.createElement("option")
      option.value = generation.id
      option.textContent = generation.name
      generationSelect.appendChild(option)
    })
    generationSelect.disabled = false
  } else {
    generationSelect.disabled = true
  }
})

// Cascading Selects for Type Form
document.getElementById("type-brand").addEventListener("change", (e) => {
  const brandId = e.target.value
  const modelSelect = document.getElementById("type-model")
  const versionSelect = document.getElementById("type-version")
  const generationSelect = document.getElementById("type-generation")

  modelSelect.innerHTML = '<option value="">Model seçin...</option>'
  versionSelect.innerHTML = '<option value="">Önce model seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  versionSelect.disabled = true
  generationSelect.disabled = true

  if (brandId) {
    const models = store.getModelsByBrand(brandId)
    models.forEach((model) => {
      const option = document.createElement("option")
      option.value = model.id
      option.textContent = model.name
      modelSelect.appendChild(option)
    })
    modelSelect.disabled = false
  } else {
    modelSelect.disabled = true
  }
})

document.getElementById("type-model").addEventListener("change", (e) => {
  const modelId = e.target.value
  const versionSelect = document.getElementById("type-version")
  const generationSelect = document.getElementById("type-generation")

  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  generationSelect.disabled = true

  if (modelId) {
    const versions = store.getVersionsByModel(modelId)
    versions.forEach((version) => {
      const option = document.createElement("option")
      option.value = version.id
      option.textContent = version.name
      versionSelect.appendChild(option)
    })
    versionSelect.disabled = false
  } else {
    versionSelect.disabled = true
  }
})

document.getElementById("type-version").addEventListener("change", (e) => {
  const versionId = e.target.value
  const generationSelect = document.getElementById("type-generation")

  generationSelect.innerHTML = '<option value="">Jenerasyon seçin...</option>'

  if (versionId) {
    const generations = store.getGenerationsByVersion(versionId)
    generations.forEach((generation) => {
      const option = document.createElement("option")
      option.value = generation.id
      option.textContent = generation.name
      generationSelect.appendChild(option)
    })
    generationSelect.disabled = false
  } else {
    generationSelect.disabled = true
  }
})

document.getElementById("type-generation").addEventListener("change", (e) => {
  const generationId = e.target.value
  const typeSelect = document.getElementById("type-type")

  typeSelect.innerHTML = '<option value="">Tip seçin...</option>'

  if (generationId) {
    const types = store.getTypesByGeneration(generationId)
    types.forEach((type) => {
      const option = document.createElement("option")
      option.value = type.id
      option.textContent = type.name
      typeSelect.appendChild(option)
    })
    typeSelect.disabled = false
  } else {
    typeSelect.disabled = true
  }
})

// Cascading Selects for Product Form
document.getElementById("product-brand").addEventListener("change", (e) => {
  const brandId = e.target.value
  const modelSelect = document.getElementById("product-model")
  const versionSelect = document.getElementById("product-version")
  const generationSelect = document.getElementById("product-generation")
  const typeSelect = document.getElementById("product-type")

  modelSelect.innerHTML = '<option value="">Model seçin...</option>'
  versionSelect.innerHTML = '<option value="">Önce model seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  versionSelect.disabled = true
  generationSelect.disabled = true
  typeSelect.disabled = true

  if (brandId) {
    const models = store.getModelsByBrand(brandId)
    models.forEach((model) => {
      const option = document.createElement("option")
      option.value = model.id
      option.textContent = model.name
      modelSelect.appendChild(option)
    })
    modelSelect.disabled = false
  } else {
    modelSelect.disabled = true
  }
})

document.getElementById("product-model").addEventListener("change", (e) => {
  const modelId = e.target.value
  const versionSelect = document.getElementById("product-version")
  const generationSelect = document.getElementById("product-generation")
  const typeSelect = document.getElementById("product-type")

  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  generationSelect.disabled = true
  typeSelect.disabled = true

  if (modelId) {
    const versions = store.getVersionsByModel(modelId)
    versions.forEach((version) => {
      const option = document.createElement("option")
      option.value = version.id
      option.textContent = version.name
      versionSelect.appendChild(option)
    })
    versionSelect.disabled = false
  } else {
    versionSelect.disabled = true
  }
})

document.getElementById("product-version").addEventListener("change", (e) => {
  const versionId = e.target.value
  const generationSelect = document.getElementById("product-generation")
  const typeSelect = document.getElementById("product-type")

  generationSelect.innerHTML = '<option value="">Jenerasyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  typeSelect.disabled = true

  if (versionId) {
    const generations = store.getGenerationsByVersion(versionId)
    generations.forEach((generation) => {
      const option = document.createElement("option")
      option.value = generation.id
      option.textContent = generation.name
      generationSelect.appendChild(option)
    })
    generationSelect.disabled = false
  } else {
    generationSelect.disabled = true
  }
})

document.getElementById("product-generation").addEventListener("change", (e) => {
  const generationId = e.target.value
  const typeSelect = document.getElementById("product-type")

  typeSelect.innerHTML = '<option value="">Tip seçin...</option>'

  if (generationId) {
    const types = store.getTypesByGeneration(generationId)
    types.forEach((type) => {
      const option = document.createElement("option")
      option.value = type.id
      option.textContent = type.name
      typeSelect.appendChild(option)
    })
    typeSelect.disabled = false
  } else {
    typeSelect.disabled = true
  }
})

// Cascading Selects for Edit Product Form
document.getElementById("edit-product-brand").addEventListener("change", (e) => {
  const brandId = e.target.value
  const modelSelect = document.getElementById("edit-product-model")
  const versionSelect = document.getElementById("edit-product-version")
  const generationSelect = document.getElementById("edit-product-generation")
  const typeSelect = document.getElementById("edit-product-type")

  modelSelect.innerHTML = '<option value="">Model seçin...</option>'
  versionSelect.innerHTML = '<option value="">Önce model seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  versionSelect.disabled = true
  generationSelect.disabled = true
  typeSelect.disabled = true

  if (brandId) {
    const models = store.getModelsByBrand(brandId)
    models.forEach((model) => {
      const option = document.createElement("option")
      option.value = model.id
      option.textContent = model.name
      modelSelect.appendChild(option)
    })
    modelSelect.disabled = false
  } else {
    modelSelect.disabled = true
  }
})

document.getElementById("edit-product-model").addEventListener("change", (e) => {
  const modelId = e.target.value
  const versionSelect = document.getElementById("edit-product-version")
  const generationSelect = document.getElementById("edit-product-generation")
  const typeSelect = document.getElementById("edit-product-type")

  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'
  generationSelect.innerHTML = '<option value="">Önce versiyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  generationSelect.disabled = true
  typeSelect.disabled = true

  if (modelId) {
    const versions = store.getVersionsByModel(modelId)
    versions.forEach((version) => {
      const option = document.createElement("option")
      option.value = version.id
      option.textContent = version.name
      versionSelect.appendChild(option)
    })
    versionSelect.disabled = false
  } else {
    versionSelect.disabled = true
  }
})

document.getElementById("edit-product-version").addEventListener("change", (e) => {
  const versionId = e.target.value
  const generationSelect = document.getElementById("edit-product-generation")
  const typeSelect = document.getElementById("edit-product-type")

  generationSelect.innerHTML = '<option value="">Jenerasyon seçin...</option>'
  typeSelect.innerHTML = '<option value="">Önce jenerasyon seçin...</option>'
  typeSelect.disabled = true

  if (versionId) {
    const generations = store.getGenerationsByVersion(versionId)
    generations.forEach((generation) => {
      const option = document.createElement("option")
      option.value = generation.id
      option.textContent = generation.name
      generationSelect.appendChild(option)
    })
    generationSelect.disabled = false
  } else {
    generationSelect.disabled = true
  }
})

document.getElementById("edit-product-generation").addEventListener("change", (e) => {
  const generationId = e.target.value
  const typeSelect = document.getElementById("edit-product-type")

  typeSelect.innerHTML = '<option value="">Tip seçin...</option>'

  if (generationId) {
    const types = store.getTypesByGeneration(generationId)
    types.forEach((type) => {
      const option = document.createElement("option")
      option.value = type.id
      option.textContent = type.name
      typeSelect.appendChild(option)
    })
    typeSelect.disabled = false
  } else {
    typeSelect.disabled = true
  }
})

// Render Functions
function renderCategory(category) {
  const listElement = document.getElementById(`${category}s-list`)
  let items = []

  switch (category) {
    case "brand":
      items = store.brands
      break
    case "model":
      items = store.models
      break
    case "version":
      items = store.versions
      break
    case "generation":
      items = store.generations
      break
    case "type":
      items = store.types
      break
  }

  if (items.length === 0) {
    listElement.innerHTML = '<div class="empty-state">Henüz veri eklenmemiş</div>'
    return
  }

  listElement.innerHTML = items
    .map((item) => {
      let meta = ""

      if (category === "model") {
        const brand = store.getBrandById(item.brandId)
        meta = brand ? brand.name : "Bilinmeyen Marka"
      } else if (category === "version") {
        const brand = store.getBrandById(item.brandId)
        const model = store.getModelById(item.modelId)
        meta = `${brand?.name || "Bilinmeyen"} - ${model?.name || "Bilinmeyen"}`
      } else if (category === "generation") {
        const brand = store.getBrandById(item.brandId)
        const model = store.getModelById(item.modelId)
        const version = store.getVersionById(item.versionId)
        meta = `${brand?.name || "Bilinmeyen"} - ${model?.name || "Bilinmeyen"} - ${version?.name || "Bilinmeyen"}`
      } else if (category === "type") {
        const brand = store.getBrandById(item.brandId)
        const model = store.getModelById(item.modelId)
        const version = store.getVersionById(item.versionId)
        const generation = store.getGenerationById(item.generationId)
        meta = `${brand?.name || "Bilinmeyen"} - ${model?.name || "Bilinmeyen"} - ${version?.name || "Bilinmeyen"} - ${generation?.name || "Bilinmeyen"}`
      }

      return `
            <div class="item">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    ${meta ? `<div class="item-meta">${meta}</div>` : ""}
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger" onclick="deleteItem('${category}', ${item.id})">Sil</button>
                </div>
            </div>
        `
    })
    .join("")
}

function renderAllCategories() {
  renderCategory("brand")
  renderCategory("model")
  renderCategory("version")
  renderCategory("generation")
  renderCategory("type")
  updateAllSelects()
}

// Render products list page
function renderProductsList() {
  const tbody = document.getElementById("products-list-table")

  if (store.products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Henüz ürün eklenmemiş</td></tr>'
    return
  }

  tbody.innerHTML = store.products
    .map((product) => {
      const brand = store.getBrandById(product.brandId)
      const model = store.getModelById(product.modelId)
      const version = store.getVersionById(product.versionId)

      return `
            <tr>
                <td>${product.name}</td>
                <td>${brand?.name || "Bilinmeyen"}</td>
                <td>${model?.name || "Bilinmeyen"}</td>
                <td>${version?.name || "Bilinmeyen"}</td>
                <td>₺${product.price.toFixed(2)}</td>
                <td>${product.stock || 0}</td>
                <td>
                    <button class="btn btn-edit" onclick="openEditModal(${product.id})">Düzenle</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Sil</button>
                </td>
            </tr>
        `
    })
    .join("")
}

// Stock management rendering function
function renderStockManagement() {
  const tbody = document.getElementById("stock-list-table")

  if (store.products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Henüz ürün eklenmemiş</td></tr>'
    return
  }

  tbody.innerHTML = store.products
    .map((product) => {
      const brand = store.getBrandById(product.brandId)
      const model = store.getModelById(product.modelId)
      const stock = product.stock || 0

      let stockStatus = "out-of-stock"
      let stockText = "Stokta Yok"

      if (stock > 10) {
        stockStatus = "in-stock"
        stockText = "Stokta"
      } else if (stock > 0) {
        stockStatus = "low-stock"
        stockText = "Düşük Stok"
      }

      return `
            <tr>
                <td>${product.name}</td>
                <td>${brand?.name || "Bilinmeyen"}</td>
                <td>${model?.name || "Bilinmeyen"}</td>
                <td>${stock}</td>
                <td><span class="stock-badge ${stockStatus}">${stockText}</span></td>
                <td>
                    <button class="btn btn-edit" onclick="openStockEditModal(${product.id})">Düzenle</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Sil</button>
                </td>
            </tr>
        `
    })
    .join("")
}

function updateDashboard() {
  document.getElementById("total-products").textContent = store.products.length
  document.getElementById("total-brands").textContent = store.brands.length
  document.getElementById("total-models").textContent = store.models.length

  const totalCategories =
    store.brands.length + store.models.length + store.versions.length + store.generations.length + store.types.length
  document.getElementById("total-categories").textContent = totalCategories

  const recentProducts = document.getElementById("recent-products")
  const recent = store.products.slice(-5).reverse()

  if (recent.length === 0) {
    recentProducts.innerHTML = '<tr><td colspan="4" class="empty-state">Henüz ürün eklenmemiş</td></tr>'
    return
  }

  recentProducts.innerHTML = recent
    .map((product) => {
      const brand = store.getBrandById(product.brandId)
      const model = store.getModelById(product.modelId)

      return `
            <tr>
                <td>${product.name}</td>
                <td>${brand?.name || "Bilinmeyen"}</td>
                <td>${model?.name || "Bilinmeyen"}</td>
                <td>₺${product.price.toFixed(2)}</td>
            </tr>
        `
    })
    .join("")
}

function updateAllSelects() {
  // Update all brand selects
  const brandSelects = [
    "model-brand",
    "version-brand",
    "generation-brand",
    "type-brand",
    "product-brand",
    "edit-product-brand",
  ]

  brandSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    if (!select) return

    const currentValue = select.value
    select.innerHTML = '<option value="">Marka seçin...</option>'

    store.brands.forEach((brand) => {
      const option = document.createElement("option")
      option.value = brand.id
      option.textContent = brand.name
      select.appendChild(option)
    })

    if (currentValue) {
      select.value = currentValue
    }
  })
}

function populateProductFormSelects() {
  const brandSelect = document.getElementById("product-brand")
  brandSelect.innerHTML = '<option value="">Marka seçin...</option>'

  store.brands.forEach((brand) => {
    const option = document.createElement("option")
    option.value = brand.id
    option.textContent = brand.name
    brandSelect.appendChild(option)
  })
}

// Modal functions for editing products
function openEditModal(productId) {
  const product = store.getProductById(productId)
  if (!product) return

  document.getElementById("edit-product-id").value = product.id
  document.getElementById("edit-product-name").value = product.name
  document.getElementById("edit-product-price").value = product.price
  document.getElementById("edit-product-description").value = product.description
  document.getElementById("edit-product-stock").value = product.stock || 0

  editProductImages = product.images || []
  const preview = document.getElementById("edit-image-preview")
  renderImagePreview(editProductImages, preview, "edit")

  // Populate brand select
  const brandSelect = document.getElementById("edit-product-brand")
  brandSelect.innerHTML = '<option value="">Marka seçin...</option>'
  store.brands.forEach((brand) => {
    const option = document.createElement("option")
    option.value = brand.id
    option.textContent = brand.name
    brandSelect.appendChild(option)
  })
  brandSelect.value = product.brandId

  // Populate model select
  const modelSelect = document.getElementById("edit-product-model")
  modelSelect.innerHTML = '<option value="">Model seçin...</option>'
  const models = store.getModelsByBrand(product.brandId)
  models.forEach((model) => {
    const option = document.createElement("option")
    option.value = model.id
    option.textContent = model.name
    modelSelect.appendChild(option)
  })
  modelSelect.disabled = false
  modelSelect.value = product.modelId

  // Populate version select
  const versionSelect = document.getElementById("edit-product-version")
  versionSelect.innerHTML = '<option value="">Versiyon seçin...</option>'
  const versions = store.getVersionsByModel(product.modelId)
  versions.forEach((version) => {
    const option = document.createElement("option")
    option.value = version.id
    option.textContent = version.name
    versionSelect.appendChild(option)
  })
  versionSelect.disabled = false
  versionSelect.value = product.versionId

  // Populate generation select
  const generationSelect = document.getElementById("edit-product-generation")
  generationSelect.innerHTML = '<option value="">Jenerasyon seçin...</option>'
  const generations = store.getGenerationsByVersion(product.versionId)
  generations.forEach((generation) => {
    const option = document.createElement("option")
    option.value = generation.id
    option.textContent = generation.name
    generationSelect.appendChild(option)
  })
  generationSelect.disabled = false
  generationSelect.value = product.generationId

  // Populate type select
  const typeSelect = document.getElementById("edit-product-type")
  typeSelect.innerHTML = '<option value="">Tip seçin...</option>'
  const types = store.getTypesByGeneration(product.generationId)
  types.forEach((type) => {
    const option = document.createElement("option")
    option.value = type.id
    option.textContent = type.name
    typeSelect.appendChild(option)
  })
  typeSelect.disabled = false
  typeSelect.value = product.typeId

  document.getElementById("edit-modal").classList.add("active")
}

function closeEditModal() {
  document.getElementById("edit-modal").classList.remove("active")
  document.getElementById("edit-product-form").reset()
  editProductImages = []
  document.getElementById("edit-image-preview").innerHTML = ""
}

// Stock edit modal functions
function openStockEditModal(productId) {
  const product = store.getProductById(productId)
  if (!product) return

  document.getElementById("stock-product-id").value = product.id
  document.getElementById("stock-product-name").value = product.name
  document.getElementById("stock-quantity").value = product.stock || 0

  document.getElementById("stock-edit-modal").classList.add("active")
}

function closeStockEditModal() {
  document.getElementById("stock-edit-modal").classList.remove("active")
  document.getElementById("edit-stock-form").reset()
}

// Close modal when clicking outside
document.getElementById("edit-modal").addEventListener("click", (e) => {
  if (e.target.id === "edit-modal") {
    closeEditModal()
  }
})

document.getElementById("stock-edit-modal").addEventListener("click", (e) => {
  if (e.target.id === "stock-edit-modal") {
    closeStockEditModal()
  }
})

// Delete Functions
function deleteItem(category, id) {
  if (confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) {
    switch (category) {
      case "brand":
        store.deleteBrand(id)
        break
      case "model":
        store.deleteModel(id)
        break
      case "version":
        store.deleteVersion(id)
        break
      case "generation":
        store.deleteGeneration(id)
        break
      case "type":
        store.deleteType(id)
        break
    }
    renderCategory(category)
    updateAllSelects()
  }
}

function deleteProduct(id) {
  if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
    store.deleteProduct(id)
    renderProductsList()
    renderStockManagement()
    updateDashboard()
  }
}

function renderOrdersList() {
  const tbody = document.getElementById("orders-list-table")

  if (store.orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Henüz sipariş yok</td></tr>'
    return
  }

  tbody.innerHTML = store.orders
    .map((order) => {
      const paymentStatusText = {
        pending: "Beklemede",
        paid: "Ödendi",
        failed: "Başarısız",
      }

      const orderStatusText = {
        preparing: "Hazırlanıyor",
        shipped: "Kargoya Verildi",
        delivered: "Teslim Edildi",
      }

      return `
            <tr>
                <td>${order.orderNumber}</td>
                <td>${order.productName}</td>
                <td>${order.orderDate}</td>
                <td>₺${order.price.toFixed(2)}</td>
                <td><span class="payment-status-badge ${order.paymentStatus}">${paymentStatusText[order.paymentStatus]}</span></td>
                <td><span class="order-status-badge ${order.orderStatus}">${orderStatusText[order.orderStatus]}</span></td>
                <td>
                    <button class="btn btn-edit" onclick="openOrderViewModal(${order.id})">Görüntüle</button>
                    <button class="btn btn-edit" onclick="openOrderEditModal(${order.id})">Düzenle</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Sil</button>
                </td>
            </tr>
        `
    })
    .join("")
}

function openOrderViewModal(orderId) {
  const order = store.getOrderById(orderId)
  if (!order) return

  const paymentStatusText = {
    pending: "Beklemede",
    paid: "Ödendi",
    failed: "Başarısız",
  }

  const orderStatusText = {
    preparing: "Hazırlanıyor",
    shipped: "Kargoya Verildi",
    delivered: "Teslim Edildi",
  }

  const content = document.getElementById("order-view-content")
  content.innerHTML = `
    <div class="order-detail-row">
      <span class="order-detail-label">Sipariş No:</span>
      <span class="order-detail-value">${order.orderNumber}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Ürün Adı:</span>
      <span class="order-detail-value">${order.productName}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Sipariş Tarihi:</span>
      <span class="order-detail-value">${order.orderDate}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Fiyat:</span>
      <span class="order-detail-value">₺${order.price.toFixed(2)}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Ödeme Durumu:</span>
      <span class="order-detail-value"><span class="payment-status-badge ${order.paymentStatus}">${paymentStatusText[order.paymentStatus]}</span></span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Sipariş Durumu:</span>
      <span class="order-detail-value"><span class="order-status-badge ${order.orderStatus}">${orderStatusText[order.orderStatus]}</span></span>
    </div>
  `

  document.getElementById("order-view-modal").classList.add("active")
}

function closeOrderViewModal() {
  document.getElementById("order-view-modal").classList.remove("active")
}

function openOrderEditModal(orderId) {
  const order = store.getOrderById(orderId)
  if (!order) return

  document.getElementById("order-id").value = order.id
  document.getElementById("order-product-name").value = order.productName
  document.getElementById("order-payment-status").value = order.paymentStatus
  document.getElementById("order-status").value = order.orderStatus

  document.getElementById("order-edit-modal").classList.add("active")
}

function closeOrderEditModal() {
  document.getElementById("order-edit-modal").classList.remove("active")
  document.getElementById("edit-order-form").reset()
}

function deleteOrder(id) {
  if (confirm("Bu siparişi silmek istediğinizden emin misiniz?")) {
    store.deleteOrder(id)
    renderOrdersList()
  }
}

document.getElementById("order-view-modal").addEventListener("click", (e) => {
  if (e.target.id === "order-view-modal") {
    closeOrderViewModal()
  }
})

document.getElementById("order-edit-modal").addEventListener("click", (e) => {
  if (e.target.id === "order-edit-modal") {
    closeOrderEditModal()
  }
})

// Initialize
updateDashboard()
renderAllCategories()

// Cash Management Variables
let cashChart = null

// Cash Management Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Cash tab switching
  document.querySelectorAll('[data-cash-tab]').forEach(btn => {
    if (btn.tagName === 'BUTTON') {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.cashTab
        
        document.querySelectorAll('[data-cash-tab]').forEach(b => {
          if (b.tagName === 'BUTTON') b.classList.remove('active')
        })
        btn.classList.add('active')
        
        document.querySelectorAll('.cash-tab-content').forEach(content => {
          content.classList.remove('active')
        })
        document.querySelector(`.cash-tab-content[data-cash-tab="${tab}"]`).classList.add('active')
      })
    }
  })

  // Set default dates
  const today = new Date().toISOString().split('T')[0]
  document.getElementById('income-date').value = today
  document.getElementById('expense-date').value = today
})

// Income Form
document.getElementById('income-form').addEventListener('submit', (e) => {
  e.preventDefault()
  
  const incomeData = {
    description: document.getElementById('income-description').value.trim(),
    amount: parseFloat(document.getElementById('income-amount').value),
    category: document.getElementById('income-category').value,
    date: document.getElementById('income-date').value
  }
  
  store.addIncome(incomeData)
  document.getElementById('income-form').reset()
  document.getElementById('income-date').value = new Date().toISOString().split('T')[0]
  
  renderIncomeList()
  updateCashSummary()
  updateCashChart()
  
  alert('Gelir başarıyla eklendi!')
})

// Expense Form
document.getElementById('expense-form').addEventListener('submit', (e) => {
  e.preventDefault()
  
  const expenseData = {
    description: document.getElementById('expense-description').value.trim(),
    amount: parseFloat(document.getElementById('expense-amount').value),
    category: document.getElementById('expense-category').value,
    date: document.getElementById('expense-date').value
  }
  
  store.addExpense(expenseData)
  document.getElementById('expense-form').reset()
  document.getElementById('expense-date').value = new Date().toISOString().split('T')[0]
  
  renderExpenseList()
  updateCashSummary()
  updateCashChart()
  
  alert('Gider başarıyla eklendi!')
})

// Render Cash Management Page
function renderCashManagement() {
  updateCashSummary()
  renderIncomeList()
  renderExpenseList()
  updateCashChart()
}

// Update Cash Summary
function updateCashSummary() {
  const totalIncome = store.getTotalIncome()
  const totalExpense = store.getTotalExpense()
  const netProfit = store.getNetProfit()
  
  document.getElementById('total-income').textContent = `₺${totalIncome.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`
  document.getElementById('total-expense').textContent = `₺${totalExpense.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`
  
  const netProfitElement = document.getElementById('net-profit')
  netProfitElement.textContent = `₺${netProfit.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`
  
  if (netProfit >= 0) {
    netProfitElement.classList.remove('profit-negative')
    netProfitElement.classList.add('profit-positive')
  } else {
    netProfitElement.classList.remove('profit-positive')
    netProfitElement.classList.add('profit-negative')
  }
}

// Render Income List
function renderIncomeList() {
  const incomes = store.getIncomes().sort((a, b) => new Date(b.date) - new Date(a.date))
  const tbody = document.getElementById('income-list')
  
  if (incomes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Henüz gelir eklenmemiş</td></tr>'
    return
  }
  
  tbody.innerHTML = incomes.map(income => `
    <tr>
      <td>${new Date(income.date).toLocaleDateString('tr-TR')}</td>
      <td>${income.description}</td>
      <td>${getCategoryName(income.category, 'income')}</td>
      <td>₺${income.amount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteIncome(${income.id})">Sil</button>
      </td>
    </tr>
  `).join('')
}

// Render Expense List
function renderExpenseList() {
  const expenses = store.getExpenses().sort((a, b) => new Date(b.date) - new Date(a.date))
  const tbody = document.getElementById('expense-list')
  
  if (expenses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Henüz gider eklenmemiş</td></tr>'
    return
  }
  
  tbody.innerHTML = expenses.map(expense => `
    <tr>
      <td>${new Date(expense.date).toLocaleDateString('tr-TR')}</td>
      <td>${expense.description}</td>
      <td>${getCategoryName(expense.category, 'expense')}</td>
      <td>₺${expense.amount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Sil</button>
      </td>
    </tr>
  `).join('')
}

// Get Category Name
function getCategoryName(category, type) {
  const categories = {
    income: {
      sales: 'Satış',
      service: 'Hizmet',
      other: 'Diğer'
    },
    expense: {
      rent: 'Kira',
      utilities: 'Faturalar',
      supplies: 'Malzeme',
      marketing: 'Pazarlama',
      other: 'Diğer'
    }
  }
  
  return categories[type][category] || category
}

// Delete Income
function deleteIncome(id) {
  if (confirm('Bu gelir kaydını silmek istediğinizden emin misiniz?')) {
    store.deleteIncome(id)
    renderIncomeList()
    updateCashSummary()
    updateCashChart()
  }
}

// Delete Expense
function deleteExpense(id) {
  if (confirm('Bu gider kaydını silmek istediğinizden emin misiniz?')) {
    store.deleteExpense(id)
    renderExpenseList()
    updateCashSummary()
    updateCashChart()
  }
}

// Update Cash Chart
function updateCashChart() {
  const ctx = document.getElementById('cashChart')
  if (!ctx) return

  const incomes = store.getIncomes()
  const expenses = store.getExpenses()

  // Group by month
  const monthlyData = {}

  incomes.forEach(income => {
    const month = income.date.substring(0, 7) // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 }
    }
    monthlyData[month].income += income.amount
  })

  expenses.forEach(expense => {
    const month = expense.date.substring(0, 7) // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 }
    }
    monthlyData[month].expense += expense.amount
  })

  const sortedMonths = Object.keys(monthlyData).sort()
  const labels = sortedMonths.map(month => {
    const [year, monthNum] = month.split('-')
    const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
    return `${monthNames[parseInt(monthNum) - 1]} ${year}`
  })

  const incomeData = sortedMonths.map(month => monthlyData[month].income)
  const expenseData = sortedMonths.map(month => monthlyData[month].expense)
  const netProfitData = sortedMonths.map(month => monthlyData[month].income - monthlyData[month].expense)

  if (cashChart) {
    cashChart.destroy()
  }

  cashChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Gelir',
          data: incomeData,
          backgroundColor: 'rgba(47, 181, 210, 0.6)',
          borderColor: 'rgba(47, 181, 210, 1)',
          borderWidth: 1,
          order: 2,
        },
        {
          label: 'Gider',
          data: expenseData,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          order: 2,
        },
        {
          label: 'Net Kar',
          data: netProfitData,
          type: 'line',
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true,
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#ffffff',
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          backgroundColor: '#0a0a0a',
          titleColor: '#ffffff',
          bodyColor: '#a0a0a0',
          borderColor: '#3a3a38',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(context.parsed.y)
              }
              return label
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#a0a0a0',
            callback: function (value) {
              return '₺' + value.toLocaleString('tr-TR')
            },
          },
          grid: {
            color: '#3a3a38',
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: '#a0a0a0',
          },
          grid: {
            display: false,
          },
        },
      },
    },
  })
}
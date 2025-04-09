const container = document.getElementById("productContainer");
const search = document.getElementById("search");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const filters = document.querySelectorAll(".filter");
const darkModeBtn = document.getElementById("darkModeBtn");
const header = document.querySelector("header");
const aside = document.querySelector("aside");

let products = [];
let liked = JSON.parse(localStorage.getItem("liked")) || [];

// Load products
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

// Render products
function renderProducts(data) {
  container.innerHTML = "";
  data.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${prod.image}" />
      <h4>${prod.name}</h4>
      <p>$${prod.price}</p>
      <button onclick="viewDetails('${prod.id}')">View Details</button>
      <button onclick="toggleLike('${prod.id}')">${liked.includes(prod.id) ? '❤️' : '🤍'}</button>
    `;
    container.appendChild(card);
  });
}

// Like functionality
function toggleLike(id) {
  if (liked.includes(id)) {
    liked = liked.filter(i => i !== id);
  } else {
    liked.push(id);
  }
  localStorage.setItem("liked", JSON.stringify(liked));
  renderProducts(products);
}

// View details alert
function viewDetails(id) {
  const prod = products.find(p => p.id === id);
  alert(`Details:\n\nName: ${prod.name}\nPrice: $${prod.price}\nCategory: ${prod.category}`);
}

// Filters
search.addEventListener("input", filterData);
minPrice.addEventListener("input", filterData);
maxPrice.addEventListener("input", filterData);
filters.forEach(cb => cb.addEventListener("change", filterData));

function filterData() {
  let filtered = products.filter(p => {
    const matchText = p.name.toLowerCase().includes(search.value.toLowerCase());
    const matchPrice = (!minPrice.value || p.price >= minPrice.value) &&
                       (!maxPrice.value || p.price <= maxPrice.value);
    const checkedCategories = [...filters].filter(f => f.checked).map(f => f.value);
    const matchCategory = checkedCategories.length ? checkedCategories.includes(p.category) : true;

    return matchText && matchPrice && matchCategory;
  });

  renderProducts(filtered);
}

// 🌙 Dark mode functionality
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  header.classList.add("dark-mode");
  aside.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️";
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");
  aside.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  darkModeBtn.textContent = isDark ? "☀️" : "🌙";
});

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "./signup_login/register.html";
}

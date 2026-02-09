// Renderizar el menú dinámicamente desde menu.json
document.addEventListener("DOMContentLoaded", async () => {
  const menuContainer = document.getElementById("menu-container");

  try {
    // Cargar el archivo JSON
    const response = await fetch("data/menu.json");
    const menuData = await response.json();

    // Agrupar productos por categoría
    const categories = {};
    menuData.products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    // Renderizar cada categoría
    Object.keys(categories).forEach((categoryName) => {
      const categorySection = document.createElement("div");
      categorySection.className = "menu-category slide-up";

      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = categoryName;
      categorySection.appendChild(categoryTitle);

      const menuGrid = document.createElement("div");
      menuGrid.className = "menu-grid";

      // Renderizar cada producto
      categories[categoryName].forEach((product) => {
        const menuItem = createMenuItem(product);
        menuGrid.appendChild(menuItem);
      });

      categorySection.appendChild(menuGrid);
      menuContainer.appendChild(categorySection);
    });

    // Activar animaciones
    observeAnimations();
  } catch (error) {
    console.error("Error cargando el menú:", error);
    menuContainer.innerHTML =
      '<p style="text-align: center;">Error cargando el menú. Por favor, intenta más tarde.</p>';
  }
});

// Crear elemento HTML para un producto
function createMenuItem(product) {
  const item = document.createElement("div");
  item.className = "menu-item";

  item.innerHTML = `
        <div class="menu-item-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="menu-item-content">
            <h3 class="menu-item-name">${product.name}</h3>
            <p class="menu-item-price">$${product.price.toLocaleString("es-AR")}</p>
        </div>
    `;

  return item;
}

// Observar elementos para animaciones
function observeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const slideUpElements = document.querySelectorAll(".slide-up");
  slideUpElements.forEach((el) => observer.observe(el));
}

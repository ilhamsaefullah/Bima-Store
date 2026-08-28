const products = [
  {
    id: 1,
    name: "Kaos Essential Crew",
    category: "kaos",
    price: 129000,
    tag: "Best seller",
    color: "#d4cfc6",
    label: "Tee",
  },
  {
    id: 2,
    name: "Kaos Oversized Wash",
    category: "kaos",
    price: 149000,
    tag: "New",
    color: "#b8c4c0",
    label: "Oversized",
  },
  {
    id: 3,
    name: "Kemeja Linen Casual",
    category: "kemeja",
    price: 249000,
    tag: null,
    color: "#cfc6b8",
    label: "Linen",
  },
  {
    id: 4,
    name: "Kemeja Oxford Daily",
    category: "kemeja",
    price: 229000,
    tag: "New",
    color: "#c2ccd6",
    label: "Oxford",
  },
  {
    id: 5,
    name: "Celana Chino Slim",
    category: "celana",
    price: 279000,
    tag: "Best seller",
    color: "#a8a49c",
    label: "Chino",
  },
  {
    id: 6,
    name: "Celana Cargo Soft",
    category: "celana",
    price: 299000,
    tag: null,
    color: "#9a9e96",
    label: "Cargo",
  },
  {
    id: 7,
    name: "Hoodie Fleece Minimal",
    category: "outer",
    price: 329000,
    tag: "New",
    color: "#8f9398",
    label: "Hoodie",
  },
  {
    id: 8,
    name: "Jaket Coach Light",
    category: "outer",
    price: 359000,
    tag: null,
    color: "#7d8580",
    label: "Coach",
  },
  {
    id: 9,
    name: "Kaos Pocket Tee",
    category: "kaos",
    price: 139000,
    tag: null,
    color: "#e0d5c8",
    label: "Pocket",
  },
];

function formatPrice(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function categoryLabel(cat) {
  const map = { kaos: "Kaos", kemeja: "Kemeja", celana: "Celana", outer: "Outer" };
  return map[cat] || cat;
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const list =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  grid.innerHTML = list
    .map(
      (p) => `
    <article class="product" data-category="${p.category}">
      <div class="product-img" style="background:${p.color}">
        <div class="swatch">${p.label}</div>
      </div>
      <div class="product-body">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${formatPrice(p.price)}</p>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      </div>
    </article>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");

  const filters = document.getElementById("filters");
  filters?.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    renderProducts(btn.dataset.filter);
  });

  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
});

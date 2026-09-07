const products = [
  {
    id: 21,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 279000,
    image: "produk/kemejapolos7.png",
  },
  {
    id: 20,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 279000,
    image: "produk/kemejapolos6.png",
  },
  {
    id: 19,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 279000,
    image: "produk/kemejapolos5.png",
  },
  {
    id: 18,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 279000,
    image: "produk/kemejapolos4.png",
  },
  {
    id: 17,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    image: "produk/kemejapolospanjang8.png",
  },
  {
    id: 16,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    image: "produk/kemejapolospanjang7.png",
  },
  {
    id: 15,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    image: "produk/kemejapolospanjang6.png",
  },
  {
    id: 14,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    image: "produk/kemejapolospanjang5.png",
  },
  {
    id: 13,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    image: "produk/kemejapolospanjang4.png",
  },
  {
    id: 12,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 279000,
    tag: "Best seller",
    image: "produk/kemejapolospanjang3.png",
  },
  {
    id: 11,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 299000,
    tag: null,
    image: "produk/kemejapolospanjang2.png",
  },
  {
    id: 10,
    name: "Kemeja Panjang",
    category: "Type C",
    price: 299000,
    tag: null,
    image: "produk/kemejapolospanjang1.png",
  },
  {
    id: 9,
    name: "Tactikal Panjang",
    category: "Type A",
    price: 129000,
    tag: "Best seller",
    image: "produk/taktikal1.png",
  },
  {
    id: 8,
    name: "Tactikal Panjang",
    category: "Type A",
    price: 149000,
    tag: "New",
    image: "produk/taktikal2.png",
  },
  {
    id: 7,
    name: "Tactikal Panjang",
    category: "Type A",
    price: 139000,
    tag: null,
    image: "produk/taktikal3.png",
  },
  {
    id: 6,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 249000,
    tag: null,
    image: "produk/kemejapolos1.png",
  },
  {
    id: 5,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 229000,
    tag: "New",
    image: "produk/kemejapolos2.png",
  },
  {
    id: 4,
    name: "Kemeja Pendek",
    category: "Type B",
    price: 229000,
    tag: "New",
    image: "produk/kemejapolos3.png",
  },
  {
    id: 3,
    name: "Kemeja Motif",
    category: "Type D",
    price: 329000,
    tag: "New",
    image: "produk/kemejamotif1.png",
  },
  {
    id: 2,
    name: "Kemeja Motif",
    category: "Type D",
    price: 359000,
    tag: null,
    image: "produk/kemejamotif2.png",
  },
  {
    id: 1,
    name: "Kemeja Motif",
    category: "Type D",
    price: 359000,
    tag: null,
    image: "produk/kemejamotif3.png",
  },
];

const PER_PAGE = 12;
let currentFilter = "all";
let currentPage = 1;

function formatPrice(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function categoryLabel(cat) {
  const map = {
    "Type A": "Kemeja Tactical",
    "Type B": "Kemeja Pendek",
    "Type C": "Kemeja Panjang",
    "Type D": "Kemeja Motif",
  };
  return map[cat] || cat;
}

function getFilteredProducts() {
  if (currentFilter === "all") return products.slice();
  return products.filter((p) => p.category === currentFilter);
}

function productImageHtml(p) {
  const fallback = p.color || "#e5e1da";
  const label = p.label || p.name.split(" ")[0];
  if (p.image) {
    return `
      <div class="product-img" style="background:${fallback}">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=\\'swatch\\'>${label}</div>');"
        />
      </div>`;
  }
  return `
    <div class="product-img" style="background:${fallback}">
      <div class="swatch">${label}</div>
    </div>`;
}

function renderPagination(totalPages) {
  const nav = document.getElementById("pagination");
  if (!nav) return;

  if (totalPages <= 1) {
    nav.innerHTML = "";
    nav.hidden = true;
    return;
  }

  nav.hidden = false;
  let html = "";
  html += `<button type="button" class="page-btn page-nav" data-page="${
    currentPage - 1
  }" ${currentPage === 1 ? "disabled" : ""} aria-label="Sebelumnya">‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button type="button" class="page-btn ${
      i === currentPage ? "on" : ""
    }" data-page="${i}">${i}</button>`;
  }

  html += `<button type="button" class="page-btn page-nav" data-page="${
    currentPage + 1
  }" ${
    currentPage === totalPages ? "disabled" : ""
  } aria-label="Berikutnya">›</button>`;

  nav.innerHTML = html;
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const list = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = list.slice(start, start + PER_PAGE);

  if (!list.length) {
    grid.innerHTML = `<p style="grid-column:1/-1;color:var(--fg-muted)">Belum ada produk di kategori ini.</p>`;
    renderPagination(0);
    return;
  }

  grid.innerHTML = pageItems
    .map(
      (p) => `
    <article class="product" data-category="${p.category}">
      ${productImageHtml(p)}
      <div class="product-body">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${formatPrice(p.price)}</p>
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      </div>
    </article>`,
    )
    .join("");

  renderPagination(totalPages);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const filters = document.getElementById("filters");
  filters?.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    currentFilter = btn.dataset.filter || "all";
    currentPage = 1;
    renderProducts();
  });

  const pagination = document.getElementById("pagination");
  pagination?.addEventListener("click", (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn || btn.disabled) return;
    const page = Number(btn.dataset.page);
    if (!Number.isFinite(page) || page < 1) return;
    currentPage = page;
    renderProducts();
    document
      .getElementById("katalog")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));
  nav
    ?.querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open")),
    );
});

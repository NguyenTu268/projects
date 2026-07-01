document.getElementById("year").textContent = new Date().getFullYear();

// Lấy giá trị theo ngôn ngữ hiện tại; nếu field là string thường (như tên dự án) thì trả về luôn
function pick(field, lang) {
  if (field && typeof field === "object") {
    return field[lang] || field.vi || field.en || "";
  }
  return field;
}

/* ---------- Theme sáng/tối (cam + trắng / cam + đen) ---------- */
const THEME_KEY = "portfolio-theme";
const themeToggle = document.getElementById("themeToggle");
const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.6A9 9 0 1 1 11.4 3a7 7 0 0 0 9.6 9.6Z"/></svg>`;

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const strings = UI_STRINGS[currentLang];
  if (themeToggle) {
    themeToggle.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    themeToggle.setAttribute("aria-label", theme === "dark" ? strings.themeToLight : strings.themeToDark);
  }
  localStorage.setItem(THEME_KEY, theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

/* ---------- Ngôn ngữ Việt/Anh ---------- */
const LANG_KEY = "portfolio-lang";
const langToggle = document.getElementById("langToggle");
const langToggleLabel = document.getElementById("langToggleLabel");

const savedLang = localStorage.getItem(LANG_KEY);
let currentLang = savedLang === "en" ? "en" : "vi";

function applyLangUI(lang) {
  const strings = UI_STRINGS[lang];
  document.documentElement.setAttribute("lang", lang);
  document.title = strings.pageTitle;
  document.getElementById("pageHeading").textContent = strings.heading;

  const subheading = document.getElementById("pageSubheading");
  subheading.textContent = strings.subheading;
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "_";
  subheading.appendChild(cursor);

  document.getElementById("pageFooter").textContent = strings.footer;
  if (langToggleLabel) langToggleLabel.textContent = strings.langToggleLabel;
  if (langToggle) langToggle.setAttribute("aria-label", strings.langToggleAria);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "vi" : "en";
    localStorage.setItem(LANG_KEY, currentLang);
    applyLangUI(currentLang);
    render(currentLang);
    applyTheme(document.documentElement.getAttribute("data-theme"));
  });
}

/* ---------- Render các dự án ---------- */
const sectionsContainer = document.getElementById("sections");
const nav = document.getElementById("sectionNav");

const arrowIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
const starIcon = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m12 2 2.9 6 6.6 1-4.8 4.7 1.1 6.6L12 17.2 6.2 20.3l1.1-6.6L2.5 9l6.6-1Z"/></svg>`;

function buildCard(project, sectionAccent, isFeatured, lang) {
  const strings = UI_STRINGS[lang];
  const card = document.createElement(project.url ? "a" : "div");
  card.className = isFeatured ? "card card--featured" : "card";
  card.dataset.bg = project.bg === "light" ? "light" : "dark";
  card.style.setProperty("--accent", project.accent || sectionAccent || "#ff6a00");
  if (project.url) {
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  card.innerHTML = `
    <div class="media">
      <img src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="scrim"></div>
    </div>
    ${isFeatured ? `<span class="ribbon">${starIcon}${strings.flagship}</span>` : ""}
    ${project.tag ? `<span class="tag">${pick(project.tag, lang)}</span>` : ""}
    <div class="name">${project.name}</div>
    <div class="overlay">
      <div class="name">${project.name}</div>
      <div class="desc">${pick(project.description, lang)}</div>
      ${project.url ? `<span class="cta">${strings.viewProject} ${arrowIcon}</span>` : ""}
    </div>
  `;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const tiltStrength = 8;
    const rotateX = (0.5 - py) * tiltStrength;
    const rotateY = (px - 0.5) * tiltStrength;

    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  return card;
}

function addNavPill(id, title, accent) {
  const pill = document.createElement("a");
  pill.href = `#${id}`;
  pill.className = "nav-pill";
  pill.dataset.target = id;
  pill.style.setProperty("--section-accent", accent);
  pill.innerHTML = `<span class="dot"></span>${title}`;
  pill.addEventListener("click", (e) => {
    e.preventDefault();
    goToSection(id);
  });
  nav.appendChild(pill);
}

const chevronIcon = `<svg class="niche-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

function sectionHeaderMarkup(icon, title, subtitle, count, countSuffix) {
  return `
    <div class="niche-header">
      <span class="niche-icon">${icon}</span>
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <span class="niche-count">${count} ${countSuffix}</span>
      ${chevronIcon}
    </div>
    <div class="niche-body">
      <div class="niche-body-inner">
        <div class="gallery"></div>
      </div>
    </div>
  `;
}

/* ---------- Accordion theo scroll: section nào ở giữa màn hình sẽ mở, các section khác đóng lại ---------- */
const ACCORDION_MS = 600; // phải khớp với thời gian transition của .niche-body trong style.css
let sectionObserver = null;
let activeSectionId = null;
let isNavigating = false; // true khi đang xử lý click nav-pill/tiêu đề, để observer không "cướp" quyền chọn section giữa lúc cuộn

function setActiveSection(id) {
  if (id === activeSectionId) return; // tránh toggle/reflow dư thừa khi observer bắn lại cùng 1 section
  activeSectionId = id;

  sectionsContainer.querySelectorAll(".niche").forEach((section) => {
    section.classList.toggle("is-open", section.id === id);
  });
  nav.querySelectorAll(".nav-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.target === id);
  });
}

// Click vào nav-pill/tiêu đề: mở section trước, ĐỢI accordion mở/đóng xong rồi mới cuộn tới —
// tránh vừa cuộn vừa đổi layout (nguyên nhân gây giật/nhảy vị trí), và khoá observer trong lúc cuộn
// để nó không tự mở nhầm section khác khi lướt qua các tiêu đề đã đóng ở giữa đường.
function goToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (id === activeSectionId) {
    // Bấm lại vào tiêu đề của section đang mở sẵn -> thu gọn lại (không mở section nào)
    setActiveSection(null);
    return;
  }

  isNavigating = true;
  setActiveSection(id);

  setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      isNavigating = false;
    }, 700);
  }, ACCORDION_MS);
}

function setupSectionAccordion() {
  if (sectionObserver) sectionObserver.disconnect();

  const sections = [...sectionsContainer.querySelectorAll(".niche")];
  if (!sections.length) return;

  activeSectionId = null; // sections vừa được dựng lại từ đầu (VD: đổi ngôn ngữ) nên phải áp lại trạng thái mở/đóng
  setActiveSection(sections[0].id);

  sectionObserver = new IntersectionObserver(
    (entries) => {
      if (isNavigating) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section.querySelector(".niche-header"));
    section.querySelector(".niche-header").addEventListener("click", () => goToSection(section.id));
  });
}

function render(lang) {
  const strings = UI_STRINGS[lang];
  sectionsContainer.innerHTML = "";
  nav.innerHTML = "";

  // Khối "Dự Án Chủ Lực" — 3 dự án lớn và quan trọng nhất, hiển thị riêng ở đầu trang
  const featuredItems = PROJECTS.filter((p) => p.featured);
  if (featuredItems.length) {
    const section = document.createElement("section");
    section.className = "niche featured";
    section.id = "featured";
    section.style.setProperty("--section-accent", FEATURED_META.accent);
    section.innerHTML = sectionHeaderMarkup(
      FEATURED_META.icon,
      pick(FEATURED_META.title, lang),
      pick(FEATURED_META.subtitle, lang),
      featuredItems.length,
      strings.projectsSuffix
    );
    section.querySelector(".gallery").classList.add("featured-grid");

    const grid = section.querySelector(".gallery");
    featuredItems.forEach((project) => grid.appendChild(buildCard(project, FEATURED_META.accent, true, lang)));

    sectionsContainer.appendChild(section);
    addNavPill("featured", pick(FEATURED_META.title, lang), FEATURED_META.accent);
  }

  // 3 khối theo ngành (không lặp lại các dự án đã lên khối chủ lực)
  SECTIONS_META.forEach((meta) => {
    const items = PROJECTS.filter((p) => p.category === meta.id && !p.featured);
    if (!items.length) return;

    const section = document.createElement("section");
    section.className = "niche";
    section.id = meta.id;
    section.style.setProperty("--section-accent", meta.accent);
    section.innerHTML = sectionHeaderMarkup(
      meta.icon,
      pick(meta.title, lang),
      pick(meta.subtitle, lang),
      items.length,
      strings.projectsSuffix
    );

    const grid = section.querySelector(".gallery");
    items.forEach((project) => grid.appendChild(buildCard(project, meta.accent, false, lang)));

    sectionsContainer.appendChild(section);
    addNavPill(meta.id, pick(meta.title, lang), meta.accent);
  });

  setupSectionAccordion();

  // Animation xuất hiện khi cuộn tới
  const cards = sectionsContainer.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), Math.min(i * 40, 320));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((card) => observer.observe(card));
}

applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light");
applyLangUI(currentLang);
render(currentLang);

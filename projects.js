// Toàn bộ chữ tĩnh trên trang (header, nút, footer...) — song ngữ Việt/Anh
const UI_STRINGS = {
  vi: {
    pageTitle: "Portfolio Dự Án",
    heading: "Portfolio Dự Án WordPress",
    subheading: "Tổng hợp các website đã thực hiện",
    projectsSuffix: "dự án",
    viewProject: "Xem dự án",
    flagship: "Chủ lực",
    footer: "Portfolio cá nhân",
    themeToLight: "Chuyển sang giao diện sáng",
    themeToDark: "Chuyển sang giao diện tối",
    langToggleLabel: "EN",
    langToggleAria: "Chuyển sang tiếng Anh"
  },
  en: {
    pageTitle: "Project Portfolio",
    heading: "WordPress Project Portfolio",
    subheading: "A showcase of websites I've built",
    projectsSuffix: "projects",
    viewProject: "View project",
    flagship: "Flagship",
    footer: "Personal Portfolio",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    langToggleLabel: "VI",
    langToggleAria: "Switch to Vietnamese"
  }
};

// Thông tin khối "Dự Án Chủ Lực" — 3 dự án lớn và quan trọng nhất, hiển thị riêng ở đầu trang
const FEATURED_META = {
  title: { vi: "Dự Án Chủ Lực", en: "Flagship Projects" },
  subtitle: {
    vi: "3 dự án lớn và quan trọng nhất trong toàn bộ portfolio",
    en: "The 3 biggest and most important projects in this portfolio"
  },
  accent: "#ff6a00",
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8Z"/></svg>`
};

// Thông tin 3 nhóm dự án — id phải khớp với category của từng project bên dưới
const SECTIONS_META = [
  {
    id: "sach",
    title: { vi: "Web Review Sạch", en: "Lifestyle Review Sites" },
    subtitle: {
      vi: "Review sản phẩm, dịch vụ, đời sống thông thường",
      en: "Everyday product, service and lifestyle reviews"
    },
    accent: "#ffb020",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M17.7 17.7l1.4 1.4M6.3 17.7l-1.4 1.4M17.7 6.3l1.4-1.4"/><circle cx="12" cy="12" r="4"/></svg>`
  },
  {
    id: "taichinh",
    title: { vi: "Web Review Tài Chính", en: "Finance Review Sites" },
    subtitle: {
      vi: "Vay vốn, thẻ tín dụng, đầu tư, bảo hiểm",
      en: "Loans, credit cards, investing, insurance"
    },
    accent: "#ff8a3d",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>`
  },
  {
    id: "casino",
    title: { vi: "Web Review Casino", en: "Casino Review Sites" },
    subtitle: {
      vi: "Nhà cái, cổng game, casino online",
      en: "Bookmakers, gaming portals, online casinos"
    },
    accent: "#ff5b1a",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>`
  }
];

// Mỗi folder ảnh ứng với 1 category + mô tả mặc định (sửa lại mô tả cho từng site tại RAW_PROJECTS nếu cần riêng biệt)
const FOLDER_DEFAULTS = {
  fresh: {
    category: "sach",
    description: {
      vi: "Website review sản phẩm/dịch vụ tổng hợp, giúp người dùng lựa chọn nhanh và chính xác.",
      en: "A general product/service review site that helps users choose quickly and confidently."
    }
  },
  finance: {
    category: "taichinh",
    description: {
      vi: "Website review sàn giao dịch, broker và công cụ tài chính, so sánh phí và độ tin cậy.",
      en: "A review site for brokers, exchanges and financial tools, comparing fees and reliability."
    }
  },
  casino: {
    category: "casino",
    description: {
      vi: "Website review nhà cái, cổng game casino online, đánh giá uy tín và ưu đãi.",
      en: "A review site for bookmakers and online casino platforms, rating trustworthiness and bonuses."
    }
  }
};

// Danh sách ảnh thật lấy từ images/fresh, images/finance, images/casino
// Mỗi item: [Tên hiển thị, tên file ảnh, nền thẻ, link website thật]
// "bg" được tính tự động bằng cách đo độ sáng trung bình của các pixel không trong suốt trong logo:
// logo màu trắng/sáng -> bg: "dark" (nền đen để logo nổi lên), logo màu đen/tối -> bg: "light" (nền trắng)
const RAW_PROJECTS = {
  fresh: [
    ["Choice Compare 360", "choicecompare360.png", "light", "https://deepreviewtrust.pro"],
    ["Real Trust Review", "realtrustreview.png", "dark", "https://realtrustreview.us"],
    ["Review King", "reviewking.svg", "dark", "https://reviewking.info"],
    ["Top Rated Now", "topratednow.png", "dark", "https://topratednow.online"],
    ["Trusted Review Spot", "trustedreviewspot.png", "light", "https://trustedreviewspot.site"],
    ["Trust Review Hub", "trustreviewhub.png", "light", "https://trustedreviewhub.site"],
    ["Tsunami Hub", "tsunamihub.svg", "light", "https://tsunamihub.info"],
    ["Tsunami Review", "tsunamireview.png", "light", "https://tsunamireviews.com"]
  ],
  finance: [
    ["Best Trade Advisors", "besttradeadvisors.png", "light", "https://besttradeadvisors.online"],
    ["Best Trade Advisors Site", "besttradeadvisorssite.png", "light", "http://besttradeadvisors.site/"],
    ["Broker Ascent", "brokerascent.png", "light", "https://brokerascent.com"],
    ["Broker Expert Reviews", "brokerexpertreviews.png", "light", "https://brokerexpertreviews.site"],
    ["Broker Insight Pro", "brokerinsightpro.png", "dark", "https://brokerinsightpro.site"],
    ["Broker Review Central", "brokerreviewcentral.png", "dark", "https://brokerreviewcentral.site"],
    ["Exchange Broker Guide", "exchangebrokerguide.png", "dark", "https://exchangebrokerguide.site"],
    ["Find Your Brokers", "findyourbrokers.png", "light", "https://findyourbrokers.com"],
    ["InvestScope", "investscope.png", "dark", "https://investscope.net"],
    ["Market Broker Check", "marketbrokercheck.png", "light", "https://marketbrokercheck.online"],
    ["Market Broker Check Site", "marketbrokerchecksite.svg", "light", "https://marketbrokercheck.site"],
    ["Market Inspectors", "marketinspectors.png", "dark", "https://marketinspectors.info"],
    ["Money Market Insight", "moneymarketinsight.png", "dark", "https://moneymarketinsight.site"],
    ["Reliable Broker Ratings", "reliablebrokerratings.png", "light", "https://reliablebrokerratings.site"],
    ["Review Trading Platforms", "reviewtradingplatforms.png", "light", "https://reviewtradingplatforms.site"],
    ["Seven Trading", "seventrading.png", "dark", "http://seventrading.net/"],
    ["Trading Platform Guide", "tradingplatformguide.png", "dark", "https://tradingplatformguide.site"]
  ],
  casino: [
    ["Best Casino Guide", "bestcasinoguide.png", "dark", "https://bestcasinoguide.site"],
    ["Best Casino Ratings", "bestcasinoratings.png", "dark", "https://bestcasinoratings.vip"],
    ["Casino Expert Review", "casinoexpertreview.png", "dark", "https://casinoexpertreview.site"],
    ["Casino Guide Expert", "casinoguideexpert.png", "light", "https://casinoguideexpert.online"],
    ["Casino Insider Guide", "casinoinsiderguide.png", "light", "https://casinoinsiderguide.site"],
    ["Casino Rating Pro", "casinoratingpro.png", "dark", "https://casinoratingspro.site"],
    ["Casino Review Hub", "casinoreviewhub.png", "dark", "https://casinoreviewhub.site"],
    ["Casino Review Hub 2", "casinoreviewhub2.png", "light", "https://casinoreviewhub.me"],
    ["Casino Trust Score", "casinotrustscore.png", "dark", "https://casinotrustscore.site"],
    ["Expert Casino Review", "expertcasinoreview.png", "light", "https://expertcasinoreview.site"],
    ["Proof Casino Review", "proofcasinoreview.png", "light", "https://proofcasinoreview.online"],
    ["Safe Casino Review", "safecasinoreview.png", "light", "https://safecasinoreview.online"],
    ["Smart Casino Guide", "smartcasinoguide.png", "light", "https://smartcasinoguide.online"],
    ["Top Casino Ratings", "topcasinoratings.png", "dark", "https://topcasinoratings.live"],
    ["Trusted Casino Ratings", "trustedcasinoratings.png", "light", "https://trustedcasinoratings.site"],
    ["Trusted Casino Review", "trustedcasinoreview.png", "light", "https://trustedcasinoreview.site"],
    ["Trusted Reviews", "trustedreviews.png", "dark", "https://trustedreviews.casino"],
    ["Verified Casino Rating", "verifiedcasinorating.png", "light", "https://verifiedcasinorating.site"]
  ]
};

// 3 dự án được đưa lên khối "Dự Án Chủ Lực" ở đầu trang (khớp theo tên) — sửa mô tả riêng cho từng dự án tại đây
const FEATURED_OVERRIDES = {
  "Review King": {
    featured: true,
    description: {
      vi: "Nền tảng review chủ lực — traffic và uy tín hàng đầu, đại diện tiêu biểu nhất cho phong cách làm web review.",
      en: "The flagship review platform — top traffic and reputation, the clearest showcase of my review-site approach."
    }
  },
  "Tsunami Hub": {
    featured: true,
    description: {
      vi: "Trung tâm tổng hợp review quy mô lớn, gộp nhiều chuyên mục vào một nền tảng duy nhất.",
      en: "A large-scale review hub that brings multiple review categories together into a single platform."
    }
  },
  "Tsunami Review": {
    featured: true,
    description: {
      vi: "Website review chủ lực trong hệ sinh thái Tsunami, đầu tư sâu về SEO và trải nghiệm người dùng.",
      en: "The flagship review site in the Tsunami family, built with deep investment in SEO and UX."
    }
  }
};

const PROJECTS = Object.keys(RAW_PROJECTS).flatMap((folder) =>
  RAW_PROJECTS[folder].map(([name, file, bg, url]) => {
    const base = {
      name,
      category: FOLDER_DEFAULTS[folder].category,
      image: `images/${folder}/${file}`,
      bg,
      url,
      description: FOLDER_DEFAULTS[folder].description
    };
    return FEATURED_OVERRIDES[name] ? { ...base, ...FEATURED_OVERRIDES[name] } : base;
  })
);

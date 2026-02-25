// /main.js

/* ---------------------------
   Helpers
---------------------------- */
function track(eventName, payload = {}) {
  if (typeof window.trackEvent === "function") {
    window.trackEvent(eventName, payload);
  } else if (window.gtag) {
    window.gtag("event", eventName, payload);
  }
}

async function fetchJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return res.json();
}

/* ---------------------------
   Campaign ref tracking (?ref=...)
---------------------------- */
function detectCampaignRef() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (!ref) return;

  localStorage.setItem("last_campaign_ref", ref);
  track("campaign_ref_visit", { ref });
}

/* ---------------------------
   Ticker
---------------------------- */
function renderTicker() {
  const tickerEl = document.getElementById("ticker");
  if (!tickerEl) return;

  const items = [
    "+30% Listener Growth",
    "13 Hotel Properties Managed",
    "+42% Revenue Growth",
    "Multi-Platform Digital Strategy",
    "CRM & Automation Systems"
  ];

  tickerEl.innerHTML = "";

  const loopItems = items.concat(items);

  loopItems.forEach((text) => {
    const span = document.createElement("span");
    span.className = "ticker-item";
    span.textContent = text;
    tickerEl.appendChild(span);
  });
}
/* ---------------------------
   Language Toggle (EN/FR)
   Uses elements with [data-i18n="key"]
---------------------------- */
const I18N = {
  en: {
    competencies_title: "Competencies",
    competencies_lead: "Click a competency to see how I apply it in real work.",
    stack_title: "Platforms & Tools",
    stack_social: "Social Platforms",
    stack_streaming: "Streaming",
    stack_distribution: "Music Distribution",
    stack_marketing: "Growth Stack",
    rev_title: "Revenue Impact",
    rev_kicker: "May → June 2023 uplift (aggregated)",
    rev_expand: "View detailed breakdown",
    samples_title: "Work Samples",
    samples_lead: "Direct links to accounts, campaigns, and coverage.",
    samples_accounts: "Accounts Managed",
    samples_sites: "Websites",
    samples_coverage: "Coverage",
    pill_growth: "Growth Strategy",
    pill_growth_sub: "Full-funnel systems",
    pill_paid: "Paid Acquisition",
    pill_paid_sub: "Google Ads, ROAS",
    pill_crm: "CRM & Automation",
    pill_crm_sub: "HubSpot workflows",
    pill_cro: "CRO & Analytics",
    pill_cro_sub: "Heatmaps, testing",
    pill_seo: "SEO & Organic",
    pill_seo_sub: "Agency oversight",
    pill_brand: "Brand & Content",
    pill_brand_sub: "Positioning + creative",
  },
  fr: {
    competencies_title: "Compétences",
    competencies_lead: "Cliquez sur une compétence pour voir comment je l’applique concrètement.",
    stack_title: "Plateformes & Outils",
    stack_social: "Réseaux Sociaux",
    stack_streaming: "Streaming",
    stack_distribution: "Distribution Musicale",
    stack_marketing: "Stack Growth",
    rev_title: "Impact Revenue",
    rev_kicker: "Hausse Mai → Juin 2023 (agrégée)",
    rev_expand: "Voir le détail",
    samples_title: "Réalisations",
    samples_lead: "Liens directs vers les comptes, campagnes et publications.",
    samples_accounts: "Comptes gérés",
    samples_sites: "Sites web",
    samples_coverage: "Publications",
    pill_growth: "Stratégie de Croissance",
    pill_growth_sub: "Systèmes full-funnel",
    pill_paid: "Acquisition Payante",
    pill_paid_sub: "Google Ads, ROAS",
    pill_crm: "CRM & Automatisation",
    pill_crm_sub: "Workflows HubSpot",
    pill_cro: "CRO & Analytics",
    pill_cro_sub: "Heatmaps, tests",
    pill_seo: "SEO & Organique",
    pill_seo_sub: "Pilotage agence",
    pill_brand: "Marque & Contenu",
    pill_brand_sub: "Positionnement + créa",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function applyI18n(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Toggle active button UI
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  // Replace all text nodes that declare a key
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang]?.[key];
    if (val) el.textContent = val;
  });

  // Re-render selected skill in the chosen language
  const panel = document.getElementById("skillPanel");
  const selected = panel?.getAttribute("data-selected-skill");
  if (selected) renderSkill(selected);

  track("language_switch", { lang });
}

function bindLanguageToggle() {
  const btns = document.querySelectorAll(".lang-btn");
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => applyI18n(btn.dataset.lang));
  });

  applyI18n(currentLang);
}

/* ---------------------------
   Clickable Skills Panel
   Requires:
   - buttons .pill with data-skill="growth|paid|..."
   - panel #skillPanel, #skillTitle, #skillDesc, #skillBody
---------------------------- */
const SKILLS = {
  growth: {
    en: {
      title: "Growth Strategy",
      desc: "Full-funnel systems from awareness to retention.",
      bullets: [
        "Funnel architecture (Awareness → Capture → Nurture → Conversion → Retention)",
        "KPI dashboards + reporting cadence",
        "Attribution thinking: what drove the result?",
      ],
    },
    fr: {
      title: "Stratégie de Croissance",
      desc: "Systèmes full-funnel : de la notoriété à la rétention.",
      bullets: [
        "Architecture funnel (Notoriété → Capture → Nurture → Conversion → Rétention)",
        "Tableaux de bord KPI + routine de reporting",
        "Logique d’attribution : qu’est-ce qui a réellement performé ?",
      ],
    },
  },
  paid: {
    en: {
      title: "Paid Acquisition",
      desc: "Performance-driven media buying with clean tracking.",
      bullets: ["Google Ads (Search/Display)", "ROAS/CAC optimization", "Conversion tracking + scaling"],
    },
    fr: {
      title: "Acquisition Payante",
      desc: "Publicité orientée performance avec tracking propre.",
      bullets: ["Google Ads (Search/Display)", "Optimisation ROAS/CAC", "Tracking conversions + scaling"],
    },
  },
  crm: {
    en: {
      title: "CRM & Automation",
      desc: "Lifecycle automation that converts leads.",
      bullets: ["HubSpot segmentation", "Nurture sequences", "Pipeline visibility + reporting"],
    },
    fr: {
      title: "CRM & Automatisation",
      desc: "Automations qui transforment les leads.",
      bullets: ["Segmentation HubSpot", "Séquences de nurturing", "Visibilité pipeline + reporting"],
    },
  },
  cro: {
    en: {
      title: "CRO & Analytics",
      desc: "Turn traffic into action.",
      bullets: ["Crazy Egg heatmaps", "Drop-off analysis", "CTA + landing page testing"],
    },
    fr: {
      title: "CRO & Analytics",
      desc: "Transformer le trafic en action.",
      bullets: ["Heatmaps Crazy Egg", "Analyse des abandons", "Tests CTA + landing pages"],
    },
  },
  seo: {
    en: {
      title: "SEO & Organic Growth",
      desc: "Organic growth aligned with business goals.",
      bullets: ["Keyword alignment", "Agency collaboration", "Content + intent strategy"],
    },
    fr: {
      title: "SEO & Croissance Organique",
      desc: "Croissance organique alignée business.",
      bullets: ["Alignement mots-clés", "Collaboration agence", "Stratégie contenu + intention"],
    },
  },
  brand: {
    en: {
      title: "Brand & Content",
      desc: "Positioning + creative execution.",
      bullets: ["Messaging & trust", "Content strategy", "Creative direction"],
    },
    fr: {
      title: "Marque & Contenu",
      desc: "Positionnement + exécution créative.",
      bullets: ["Messaging & confiance", "Stratégie contenu", "Direction créative"],
    },
  },
};

function renderSkill(skillKey) {
  const panel = document.getElementById("skillPanel");
  const titleEl = document.getElementById("skillTitle");
  const descEl = document.getElementById("skillDesc");
  const bodyEl = document.getElementById("skillBody");

  const data = SKILLS?.[skillKey]?.[currentLang];
  if (!panel || !titleEl || !descEl || !bodyEl || !data) return;

  panel.setAttribute("data-selected-skill", skillKey);
  titleEl.textContent = data.title;
  descEl.textContent = data.desc;

  bodyEl.innerHTML = `
    <ul class="bullet-list">
      ${data.bullets.map((x) => `<li>${x}</li>`).join("")}
    </ul>
  `;

  track("skill_click", { skill: skillKey, lang: currentLang });
}

function bindSkills() {
  const pills = document.querySelectorAll(".pill");
  if (!pills.length) return;

  pills.forEach((p) => {
    p.addEventListener("click", () => {
      pills.forEach((x) => x.classList.remove("is-active"));
      p.classList.add("is-active");
      renderSkill(p.dataset.skill);
    });
  });

  // Auto-select first pill for a polished first impression
  const first = pills[0];
  if (first) {
    first.classList.add("is-active");
    renderSkill(first.dataset.skill);
  }
}

/* ---------------------------
   Outbound link tracking
   Add: data-outbound="label" on <a>
---------------------------- */
function bindOutboundTracking() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    // CV
    if (a.id === "cvDownloadBtn") {
      track("cv_download", { location: "hero" });
      return;
    }

    // outbound
    const label = a.getAttribute("data-outbound");
    if (label) {
      track("outbound_click", { label, url: a.href });
    }
  });
}

/* ---------------------------
   Optional: load metrics.json and inject key totals
   If you have elements like:
   - .rev-total-usd
   - .rev-total-ugx
---------------------------- */
async function hydrateRevenueTotals() {
  const usdEl = document.querySelector(".rev-total-usd");
  const ugxEl = document.querySelector(".rev-total-ugx");
  if (!usdEl && !ugxEl) return;

  try {
    const metrics = await fetchJSON("data/metrics.json");
    const usd = metrics?.summary?.totalRevenueUSD;
    const ugx = metrics?.summary?.totalRevenueUGX;

    if (usdEl && typeof usd === "number") {
      usdEl.textContent = `+$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (ugxEl && typeof ugx === "number") {
      ugxEl.textContent = `+UGX ${ugx.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  } catch (err) {
    console.error(err);
  }
}

/* ---------------------------
   Bootstrap
---------------------------- */
function init() {
  detectCampaignRef();
  renderTicker();
  bindOutboundTracking();
  bindLanguageToggle();
  bindSkills();
  hydrateRevenueTotals();
}

document.addEventListener("DOMContentLoaded", init);
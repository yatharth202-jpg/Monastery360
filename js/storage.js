// Quota-Safe LocalStorage Manager JS Module
const STORAGE_KEYS = {
  REPORTS: 'monastery360_reports',
  LANG: 'monastery360_lang',
  UPVOTES: 'monastery360_upvotes',
  TRUST_MODE: 'monastery360_trust_mode',
  RATINGS: 'monastery360_ratings',
  THEME: 'monastery360_theme'
};

const SEED_REPORTS = [
  {
    id: "REP-2026-0001",
    monasteryId: "pemayangtse",
    categoryKey: "mural",
    severityKey: "critical",
    description: "Severe moisture seepage penetrating 18th-century Guru Rinpoche mural on the 1st floor prayer sanctum.",
    photo: {
      hasPhoto: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
      aiScan: { decayType: "Mural Pigment Flaking & Moisture Seepage", confidence: 0.94, suggestedPriority: "critical" }
    },
    reporterName: "Lama Dorje Tenzin",
    upvotes: 28,
    status: "verified",
    createdAt: "2026-07-30",
    routing: { agency: "Archaeological Survey of India (ASI) — National Ancient Monuments Cell" }
  },
  {
    id: "REP-2026-0410",
    monasteryId: "tholung",
    categoryKey: "electricalSafety",
    severityKey: "critical",
    description: "Exposed electrical wiring near wooden butter-lamp altar posing potential fire risk in sacred relic store.",
    photo: {
      hasPhoto: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800",
      aiScan: { decayType: "Fire Safety Hazard Near Timber Altar", confidence: 0.91, suggestedPriority: "critical" }
    },
    reporterName: "Pema Lepcha",
    upvotes: 23,
    status: "verified",
    createdAt: "2026-05-18",
    routing: { agency: "Department of Tourism & Civil Aviation, Government of Sikkim" }
  }
];

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(SEED_REPORTS));
  }
}

function getReports() {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : SEED_REPORTS;
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
}

function setSavedTheme(mode) {
  localStorage.setItem(STORAGE_KEYS.THEME, mode);
}

function getSavedLanguage() {
  return localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
}

function setSavedLanguage(lang) {
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
}

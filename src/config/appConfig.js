// ============================================================================
// MONASTERY360 — EASY EDIT CONFIGURATION FILE
// ============================================================================
// Edit this file to easily customize quotes, app settings, helpline numbers,
// government contact information, or initial values without modifying components!
// ============================================================================

export const APP_CONFIG = {
  // App Identity
  appName: "Monastery360",
  appModuleTag: "Heritage Guardian",
  hackathonId: "SIH25061",
  departmentName: "Government of Sikkim • Tourism & Cultural Preservation",

  // Buddhist Wisdom & Heritage Quotes (Displayed on Hero & Section Banners)
  buddhistQuotes: [
    {
      quote: "Peace comes from within. Do not seek it without. Protect that which preserves sacred wisdom.",
      author: "Gautama Buddha",
      source: "Dhammapada"
    },
    {
      quote: "Just as a flower blooms in harmony with nature, our heritage lives when cared for with mindful hands.",
      author: "Latsun Chembo",
      source: "Sikkim Sacred Texts"
    },
    {
      quote: "To preserve an ancient mural or sacred text is to keep the lamp of compassion burning for future generations.",
      author: "Guru Rinpoche (Padmasambhava)",
      source: "Ancient Chronicle"
    },
    {
      quote: "In the quiet stone and painted cloth of monasteries lies the living heart of Himalayan peace.",
      author: "Gyalshe Thokme Zangpo",
      source: "37 Practices of a Bodhisattva"
    }
  ],

  // Emergency Helplines & Contact Information
  helplines: [
    {
      department: "Ecclesiastical Affairs Control",
      phone: "03592-203310",
      email: "eccl.affairs@sikkim.gov.in"
    },
    {
      department: "Monastery Tourism & Culture Cell",
      phone: "03592-209090",
      email: "heritage.tourism@sikkim.gov.in"
    },
    {
      department: "ASI Sikkim Conservation Circle",
      phone: "03592-202241",
      email: "asi.sikkimcircle@nic.in"
    }
  ],

  // Heritage Preservation Thresholds
  settings: {
    urgentUpvoteThreshold: 15, // Upvotes needed to trigger URGENT tag
    enableAiSimulation: true,   // Show AI pre-analysis scanner
    enableGlassmorphism: true,  // Use backdrop blur glass panels
    defaultLanguage: 'en'       // Default fallback language
  }
};

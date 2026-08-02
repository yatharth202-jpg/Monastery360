// Initial seed reports with authentic Tibetan Buddhism and Sikkimese monastery images

export const INITIAL_REPORTS = [
  {
    id: "REP-2026-0001",
    monasteryId: "pemayangtse",
    categoryKey: "mural",
    severityKey: "critical",
    description: "Severe moisture seepage penetrating 18th-century Guru Rinpoche mural on the 1st floor prayer sanctum. Pigments flaking off around central thangka figure.",
    photo: {
      hasPhoto: true,
      filename: "pemayangtse_mural_decay.jpg",
      timestamp: "2026-07-30 14:15",
      thumbnailUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
      aiScan: {
        decayType: "Mural Pigment Flaking & Moisture Seepage",
        confidence: 0.94,
        suggestedPriority: "critical",
        detectedFeatures: ["Seepage Discoloration", "Pigment Flaking", "Substrate Crack"],
        recommendedAction: "Micro-injection consolidation & desiccant dehumidification"
      }
    },
    reporterRole: "monk",
    isAnonymous: false,
    reporterName: "Lama Dorje Tenzin",
    upvotes: 28,
    duplicateCount: 2,
    status: "verified",
    createdAt: "2026-07-30",
    routing: {
      code: "ASI",
      agency: "Archaeological Survey of India (ASI) — National Ancient Monuments Cell",
      contact: "asi.sikkimcircle@nic.in | 03592-202241"
    },
    timelineHistory: [
      { date: "2026-07-30", event: "Logged by Senior Conservator Monk", status: "pending" },
      { date: "2026-07-31", event: "Verified by Sikkim Monastic Trust & ASI Inspection Team", status: "verified" }
    ]
  },
  {
    id: "REP-2026-0410",
    monasteryId: "tholung",
    categoryKey: "electricalSafety",
    severityKey: "critical",
    description: "Exposed electrical wiring near wooden butter-lamp altar posing potential fire risk in sacred relic store.",
    photo: {
      hasPhoto: true,
      filename: "tholung_butterlamp_altar.jpg",
      timestamp: "2026-05-18 10:30",
      thumbnailUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800",
      aiScan: {
        decayType: "Fire Safety Hazard Near Timber Altar",
        confidence: 0.91,
        suggestedPriority: "critical",
        detectedFeatures: ["Exposed Conduit", "Timber Proximity", "Butter Lamp Heat"],
        recommendedAction: "Immediate flame-retardant conduit casing & fire extinguisher placement"
      }
    },
    reporterRole: "tourist",
    isAnonymous: false,
    reporterName: "Pema Lepcha",
    upvotes: 23,
    duplicateCount: 1,
    status: "verified",
    createdAt: "2026-05-18",
    routing: {
      code: "SK_TOURISM",
      agency: "Department of Tourism & Civil Aviation, Government of Sikkim",
      contact: "heritage.tourism@sikkim.gov.in | 03592-209090"
    },
    timelineHistory: [
      { date: "2026-05-18", event: "Community Alert Logged by Visitor", status: "pending" },
      { date: "2026-05-20", event: "Verified by Department of Tourism Officers", status: "verified" }
    ]
  },
  {
    id: "REP-2026-0112",
    monasteryId: "rumtek",
    categoryKey: "roofLeak",
    severityKey: "medium",
    description: "Roof tile displacement on eastern corridor roof after heavy monsoon downpour causing minor water drips near prayer drum walkway.",
    photo: {
      hasPhoto: true,
      filename: "rumtek_roof_tiles.jpg",
      timestamp: "2026-07-25 11:20",
      thumbnailUrl: "https://images.unsplash.com/photo-1609873963526-7cfa8c9735d4?auto=format&fit=crop&q=80&w=800",
      aiScan: {
        decayType: "Eaves & Tile Displacement",
        confidence: 0.88,
        suggestedPriority: "medium",
        detectedFeatures: ["Displaced Clay Tile", "Eaves Seepage"],
        recommendedAction: "Replace broken tiles and seal membrane under-layer"
      }
    },
    reporterRole: "local",
    isAnonymous: false,
    reporterName: "Sonam Bhutia",
    upvotes: 14,
    duplicateCount: 0,
    status: "pending",
    createdAt: "2026-07-25",
    routing: {
      code: "SK_TOURISM",
      agency: "Department of Tourism & Civil Aviation, Government of Sikkim",
      contact: "heritage.tourism@sikkim.gov.in | 03592-209090"
    },
    timelineHistory: [
      { date: "2026-07-25", event: "Logged by Rumtek Local Resident", status: "pending" }
    ]
  },
  {
    id: "REP-2026-0205",
    monasteryId: "tashiding",
    categoryKey: "stoneSculpture",
    severityKey: "low",
    description: "Surface moss growth and erosion on ancient carved stone prayer tablets (Mani Stones) near the holy Bumchu entrance gateway.",
    photo: {
      hasPhoto: true,
      filename: "tashiding_mani_stones.jpg",
      timestamp: "2026-07-15 09:45",
      thumbnailUrl: "https://images.unsplash.com/photo-1590059301901-b841e2474136?auto=format&fit=crop&q=80&w=800",
      aiScan: {
        decayType: "Biological Growth & Lichen Bio-film",
        confidence: 0.86,
        suggestedPriority: "low",
        detectedFeatures: ["Lichens Growth", "Carving Abrasion"],
        recommendedAction: "Gentle non-ionic biocide treatment and soft-brush wash"
      }
    },
    reporterRole: "tourist",
    isAnonymous: true,
    reporterName: "Anonymous Observer",
    upvotes: 8,
    duplicateCount: 0,
    status: "pending",
    createdAt: "2026-07-15",
    routing: {
      code: "SK_ECCL",
      agency: "Ecclesiastical Affairs Department, Government of Sikkim",
      contact: "eccl.affairs@sikkim.gov.in | 03592-203310"
    },
    timelineHistory: [
      { date: "2026-07-15", event: "Logged by Heritage Observer", status: "pending" }
    ]
  }
];

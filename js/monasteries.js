// Monastery Metadata JS Module
const MONASTERIES = [
  {
    id: "rumtek",
    name: { en: "Rumtek Monastery (Dharma Chakra Centre)", ne: "रुमटेक गुम्बा", si: "རུམ་ཐེག་ དགོན་པ།" },
    district: "Gangtok District (East Sikkim)",
    location: "Rumtek, 24 km from Gangtok",
    builtYear: 1740,
    sect: "Karma Kagyu",
    healthScore: 84,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
    description: { en: "Seat of the Gyalwang Karmapa in exile. Houses priceless golden stupas, rare manuscripts, and intricate murals." },
    keyAssets: ["Golden Stupa Repository", "Silk Thangkas", "16th-Century Murals", "Carved Prayer Drums"]
  },
  {
    id: "pemayangtse",
    name: { en: "Pemayangtse Monastery", ne: "पेमायाङ्त्से गुम्बा", si: "པདྨ་ཡང་རྩེ་ དགོན་པ།" },
    district: "Gyalshing District (West Sikkim)",
    location: "Pelling, West Sikkim",
    builtYear: 1705,
    sect: "Nyingma (Ta-tshang Monks)",
    healthScore: 68,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1000",
    description: { en: "One of Sikkim's premier Nyingma monasteries. Famous for Zandog Palri (7-tiered wooden structure of Guru Rinpoche's Heavenly Palace)." },
    keyAssets: ["Zandog Palri Wooden Sculpture", "Wall Frescoes", "Ancient Ritual Masks", "Wooden Structural Beams"]
  },
  {
    id: "tashiding",
    name: { en: "Tashiding Monastery", ne: "ताशिदिङ गुम्बा", si: "བཀྲ་ཤིས་ལྡིང་ དགོན་པ།" },
    district: "Gyalshing District (West Sikkim)",
    location: "Tashiding Hill, West Sikkim",
    builtYear: 1641,
    sect: "Nyingma",
    healthScore: 72,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1609873963526-7cfa8c9735d4?auto=format&fit=crop&q=80&w=1000",
    description: { en: "Holiest monastery in Sikkim, atop a heart-shaped hill between Rathong and Rangeet rivers. Site of the sacred Bumchu Festival." },
    keyAssets: ["Thongwa Rangdol Sacred Stupa", "Bumchu Holy Water Vault", "Engraved Stone Tablets"]
  },
  {
    id: "labrang",
    name: { en: "Labrang Monastery", ne: "लाब्राङ गुम्बा", si: "བླ་བྲང་ དགོན་པ།" },
    district: "Mangan District (North Sikkim)",
    location: "Phodong, North Sikkim",
    builtYear: 1814,
    sect: "Nyingma",
    healthScore: 61,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1590059301901-b841e2474136?auto=format&fit=crop&q=80&w=1000",
    description: { en: "Unique octagonal stone architectural marvel built by Latsun Chembo. Preserves rare Tibetan texts." },
    keyAssets: ["Octagonal Stone Base", "Xylograph Woodblocks", "Mural Frescoes"]
  },
  {
    id: "dubdi",
    name: { en: "Dubdi Monastery (Hermit's Cell)", ne: "दुब्दी गुम्बा", si: "གྲུབ་སྡེ་ དགོན་པ།" },
    district: "Gyalshing District (West Sikkim)",
    location: "Yuksom, West Sikkim",
    builtYear: 1701,
    sect: "Nyingma",
    healthScore: 59,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1000",
    description: { en: "Oldest monastery in Sikkim, established at the first coronation site of Yuksom." },
    keyAssets: ["1701 Wooden Shrine", "Monk Hermitage Rooms", "Saints Statues"]
  },
  {
    id: "tholung",
    name: { en: "Tholung Monastery", ne: "थोलुङ गुम्बा", si: "མཐོ་ལུང་ དགོན་པ།" },
    district: "Mangan District (North Sikkim)",
    location: "Dzongu Reserve, North Sikkim",
    builtYear: 1789,
    sect: "Nyingma",
    healthScore: 78,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=1000",
    description: { en: "Remote holy monastery in the Dzongu Lepcha sanctuary. Vault for Sikkim's most sacred relics." },
    keyAssets: ["Kamsil Relic Vault", "Copper & Gold Statues", "Leather Scroll Texts"]
  }
];

function getMonasteryById(id) {
  return MONASTERIES.find(m => m.id === id) || MONASTERIES[0];
}

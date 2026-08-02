// Monastery metadata for 6 major Sikkimese monasteries

export const MONASTERIES = [
  {
    id: "rumtek",
    name: {
      en: "Rumtek Monastery (Dharma Chakra Centre)",
      ne: "रुमटेक गुम्बा (धर्म चक्र केन्द्र)",
      si: "རུམ་ཐེག་ དགོན་པ།"
    },
    district: "Gangtok District (East Sikkim)",
    location: "Rumtek, 24 km from Gangtok",
    builtYear: 1740,
    rebuiltYear: 1966,
    sect: "Karma Kagyu",
    healthScore: 84,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "Seat of the Gyalwang Karmapa in exile. Houses priceless golden stupas, rare manuscripts, and intricate murals.",
      ne: "ग्याल्वाङ कर्मापाको गद्दी स्थान। यहाँ सुनौला स्तूप, दुर्लभ पाण्डुलिपि र भित्तेचित्रहरू छन्।",
      si: "རྒྱལ་วัง ཀར་མ་པའི་ གདན་ས། རྩ་ཆེན་ གསེར་གྱི་ མཆོད་རྟེན་ དང་ དཔེ་ཆ་ ཡོད།"
    },
    keyAssets: ["Golden Stupa Repository", "Silk Thangkas", "16th-Century Murals", "Carved Prayer Drums"]
  },
  {
    id: "pemayangtse",
    name: {
      en: "Pemayangtse Monastery",
      ne: "पेमायाङ्त्से गुम्बा",
      si: "པདྨ་ཡང་རྩེ་ དགོན་པ།"
    },
    district: "Gyalshing District (West Sikkim)",
    location: "Pelling, West Sikkim",
    builtYear: 1705,
    sect: "Nyingma (Ta-tshang Monks)",
    healthScore: 68,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "One of Sikkim's premier Nyingma monasteries. Famous for Zandog Palri (7-tiered wooden structure of Guru Rinpoche's Heavenly Palace).",
      ne: "सिक्किमको प्रमुख न्यिङमा गुम्बा। गुरु रिन्पोछेको स्वर्गलोक झल्काउने ७ तले काठको जन्दोग पाल्रीका लागि प्रसिद्ध।",
      si: "འབྲས་ལྗོངས་ རྙིང་མའི་ དགོན་ཆེན། ཟངས་མདོག་ དཔལ་རི་ ཤིང་བཟོ་ རྩ་ཆེན།"
    },
    keyAssets: ["Zandog Palri Wooden Sculpture", "Wall Frescoes", "Ancient Ritual Masks", "Wooden Structural Beams"]
  },
  {
    id: "tashiding",
    name: {
      en: "Tashiding Monastery",
      ne: "ताशिदिङ गुम्बा",
      si: "བཀྲ་ཤིས་ལྡིང་ དགོན་པ།"
    },
    district: "Gyalshing District (West Sikkim)",
    location: "Tashiding Hill, West Sikkim",
    builtYear: 1641,
    sect: "Nyingma",
    healthScore: 72,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1609873963526-7cfa8c9735d4?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "Holiest monastery in Sikkim, atop a heart-shaped hill between Rathong and Rangeet rivers. Site of the sacred Bumchu Festival.",
      ne: "सिक्किमको सबैभन्दा पवित्र गुम्बा। प्रसिद्ध बुमछु (पवित्र जल) चाडको मुख्य स्थल।",
      si: "འབྲས་ལྗོངས་ གནས་ཆེན་ བཀྲ་ཤིས་ལྡིང་། བུམ་ཆུ་ བུམ་པ་ རྩ་ཆེན།"
    },
    keyAssets: ["Thongwa Rangdol Sacred Stupa", "Bumchu Holy Water Vault", "Engraved Stone Tablets", "Entrance Gateway Murals"]
  },
  {
    id: "labrang",
    name: {
      en: "Labrang Monastery",
      ne: "लाब्राङ गुम्बा",
      si: "བླ་བྲང་ དགོན་པ།"
    },
    district: "Mangan District (North Sikkim)",
    location: "Phodong, North Sikkim",
    builtYear: 1814,
    sect: "Nyingma",
    healthScore: 61,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1590059301901-b841e2474136?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "Unique octagonal stone architectural marvel built by Latsun Chembo. Preserves rare Tibetan texts and woodblock prints.",
      ne: "आठकोणे ढुङ्गाको अद्भूत वास्तुकला भएको गुम्बा। यहाँ दुर्लभ तिब्बती हस्तलिखित ग्रन्थहरू संरक्षित छन्।",
      si: "ཟུར་བརྒྱད་ རྡོ་བཟོ་ དགོན་པ། གསུང་རབ་ དཔར་ཤིང་ རྩ་ཆེན།"
    },
    keyAssets: ["Octagonal Stone Base", "Xylograph Woodblocks", "Mural Frescoes", "Roof Timber Pillars"]
  },
  {
    id: "dubdi",
    name: {
      en: "Dubdi Monastery (Hermit's Cell)",
      ne: "दुब्दी गुम्बा (युक्सोम)",
      si: "གྲུབ་སྡེ་ དགོན་པ།"
    },
    district: "Gyalshing District (West Sikkim)",
    location: "Yuksom, West Sikkim",
    builtYear: 1701,
    sect: "Nyingma",
    healthScore: 59,
    riskLevel: "High Vulnerability",
    defaultAuthority: "Archaeological Survey of India (ASI)",
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "Oldest monastery in Sikkim, established at the first coronation site of Yuksom. Nestled amidst dense pine forests.",
      ne: "सिक्किमको सबैभन्दा पुरानो गुम्बा, १७०१ मा स्थापित। युक्सोमको ऐतिहासिक वन क्षेत्रमा अवस्थित।",
      si: "འབྲས་ལྗོངས་ དགོན་པ་ རྙིང་ཤོས། ༡༧༠༡ ལོར་ བཞེངས་པ།"
    },
    keyAssets: ["1701 Wooden Shrine", "Monk Hermitage Rooms", "Saints Statues", "Stone Paved Pathway"]
  },
  {
    id: "tholung",
    name: {
      en: "Tholung Monastery",
      ne: "थोलुङ गुम्बा",
      si: "མཐོ་ལུང་ དགོན་པ།"
    },
    district: "Mangan District (North Sikkim)",
    location: "Dzongu Reserve, North Sikkim",
    builtYear: 1789,
    sect: "Nyingma",
    healthScore: 78,
    riskLevel: "Moderate Risk",
    defaultAuthority: "Department of Tourism & Civil Aviation, Sikkim",
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=1000",
    description: {
      en: "Remote holy monastery in the Dzongu Lepcha sanctuary. Vault for Sikkim's most sacred relics, opened only once every 3 years.",
      ne: "जोनगु क्षेत्रको दुर्गम पवित्र गुम्बा। सिक्किमका सबैभन्दा बहुमूल्य धार्मिक अवशेषहरूको सुरक्षित भण्डार।",
      si: "རྫོང་ཨུ་ རྫོང་གསེབ་ དགོན་པ། རྩ་ཆེན་ རིང་བསྲེལ་ བཞུགས་ས།"
    },
    keyAssets: ["Kamsil Relic Vault", "Copper & Gold Statues", "Leather Scroll Texts", "Timber Fortress Wall"]
  }
];

export function getMonasteryById(id) {
  return MONASTERIES.find(m => m.id === id) || MONASTERIES[0];
}

// Dynamic Government Routing Helper Function
export function getGovernmentRoutingAuthority(monasteryId, categoryKey) {
  const monastery = MONASTERIES.find(m => m.id === monasteryId);
  
  if (monastery && monastery.asiProtected && ['mural', 'manuscript', 'stoneSculpture'].includes(categoryKey)) {
    return {
      code: "ASI",
      name: "Archaeological Survey of India (ASI) — Kolkata & Sikkim Circle",
      dept: "National Ancient Monuments Preservation Cell",
      contact: "asi.sikkimcircle@nic.in | Emergency Hotline: 03592-202241",
      badgeColor: "bg-blue-900 text-blue-100 border-blue-700"
    };
  }

  if (['roofLeak', 'woodenPillar', 'electricalSafety'].includes(categoryKey)) {
    return {
      code: "SK_TOURISM",
      name: "Department of Tourism & Civil Aviation, Government of Sikkim",
      dept: "Monastery Tourism & Infrastructure Cell, Gangtok",
      contact: "heritage.tourism@sikkim.gov.in | Control Room: 03592-209090",
      badgeColor: "bg-amber-900 text-amber-100 border-amber-700"
    };
  }

  return {
    code: "SK_ECCL",
    name: "Ecclesiastical Affairs Department, Government of Sikkim",
    dept: "Monastery Trust Affairs & Religious Endowments",
    contact: "eccl.affairs@sikkim.gov.in | Helpline: 03592-203310",
    badgeColor: "bg-emerald-900 text-emerald-100 border-emerald-700"
  };
}

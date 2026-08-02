/* ==========================================================================
   MONASTERY360 — HERITAGE GUARDIAN (SIH25061)
   Pure JavaScript Engine — Saved in single folder 'report-damage'
   ========================================================================== */

// 1. Monasteries Database (6 Sacred Sikkimese Monasteries with High-Res Images)
const MONASTERIES = [
  {
    id: "rumtek",
    name: "Rumtek Monastery (Dharma Chakra Centre)",
    district: "Gangtok District (East Sikkim)",
    builtYear: 1740,
    sect: "Karma Kagyu",
    healthScore: 84,
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
    description: "Seat of the Gyalwang Karmapa in exile. Houses priceless golden stupas, rare manuscripts, and intricate murals.",
    keyAssets: ["Golden Stupa Repository", "Silk Thangkas", "16th-Century Murals", "Carved Prayer Drums"]
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    district: "Gyalshing District (West Sikkim)",
    builtYear: 1705,
    sect: "Nyingma (Ta-tshang Monks)",
    healthScore: 68,
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1000",
    description: "One of Sikkim's premier Nyingma monasteries. Famous for Zandog Palri (7-tiered wooden structure of Guru Rinpoche).",
    keyAssets: ["Zandog Palri Wooden Sculpture", "Wall Frescoes", "Ancient Ritual Masks", "Wooden Structural Beams"]
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    district: "Gyalshing District (West Sikkim)",
    builtYear: 1641,
    sect: "Nyingma",
    healthScore: 72,
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1609873963526-7cfa8c9735d4?auto=format&fit=crop&q=80&w=1000",
    description: "Holiest monastery in Sikkim, atop a heart-shaped hill between Rathong and Rangeet rivers. Site of the sacred Bumchu Festival.",
    keyAssets: ["Thongwa Rangdol Sacred Stupa", "Bumchu Holy Water Vault", "Engraved Stone Tablets", "Entrance Gateway Murals"]
  },
  {
    id: "labrang",
    name: "Labrang Monastery",
    district: "Mangan District (North Sikkim)",
    builtYear: 1814,
    sect: "Nyingma",
    healthScore: 61,
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1590059301901-b841e2474136?auto=format&fit=crop&q=80&w=1000",
    description: "Unique octagonal stone architectural marvel built by Latsun Chembo. Preserves rare Tibetan texts and woodblock prints.",
    keyAssets: ["Octagonal Stone Base", "Xylograph Woodblocks", "Mural Frescoes", "Roof Timber Pillars"]
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery (Hermit's Cell)",
    district: "Gyalshing District (West Sikkim)",
    builtYear: 1701,
    sect: "Nyingma",
    healthScore: 59,
    asiProtected: true,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1000",
    description: "Oldest monastery in Sikkim, established at the first coronation site of Yuksom nestled in dense pine forests.",
    keyAssets: ["1701 Wooden Shrine", "Monk Hermitage Rooms", "Saints Statues", "Stone Paved Pathway"]
  },
  {
    id: "tholung",
    name: "Tholung Monastery",
    district: "Mangan District (North Sikkim)",
    builtYear: 1789,
    sect: "Nyingma",
    healthScore: 78,
    asiProtected: false,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=1000",
    description: "Remote holy monastery in the Dzongu Lepcha sanctuary storing Sikkim's most sacred relics, opened once every 3 years.",
    keyAssets: ["Kamsil Relic Vault", "Copper & Gold Statues", "Leather Scroll Texts", "Timber Fortress Wall"]
  }
];

const QUOTES = [
  { text: "Protecting sacred heritage preserves the soul of future generations.", author: "Latsun Chembo (Yuksom Annals)" },
  { text: "In the stillness of the mountain monastery, wisdom blossoms like a lotus.", author: "Gyalwa Karmapa (Rumtek Inscriptions)" },
  { text: "Every stone carved with prayers holds the devotion of centuries.", author: "Sikkim Monastic Chronicles" }
];

let quoteIndex = 0;

let reports = JSON.parse(localStorage.getItem('monastery360_reports')) || [
  { id: "REP-2026-0001", monasteryId: "pemayangtse", categoryKey: "mural", description: "Severe moisture seepage penetrating 18th-century Guru Rinpoche mural.", upvotes: 28, status: "verified", createdAt: "2026-07-30" },
  { id: "REP-2026-0410", monasteryId: "tholung", categoryKey: "electricalSafety", description: "Exposed electrical wiring near wooden butter-lamp altar.", upvotes: 23, status: "verified", createdAt: "2026-05-18" },
  { id: "REP-2026-0112", monasteryId: "rumtek", categoryKey: "roofLeak", description: "Roof tile displacement on eastern corridor roof after heavy monsoon downpour.", upvotes: 14, status: "pending", createdAt: "2026-07-25" }
];

function saveReports() {
  localStorage.setItem('monastery360_reports', JSON.stringify(reports));
}

function switchPage(pageId) {
  ['home', 'feed', 'report', 'dashboard', 'audit', 'admin'].forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) el.classList.add('hidden');
    const navBtn = document.getElementById(`nav-${p}`);
    if (navBtn) {
      navBtn.classList.remove('bg-yellow-500/20', 'text-yellow-400', 'border', 'border-yellow-500/40');
      navBtn.classList.add('text-gray-300');
    }
  });

  const activeEl = document.getElementById(`page-${pageId}`);
  if (activeEl) activeEl.classList.remove('hidden');

  const activeBtn = document.getElementById(`nav-${pageId}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-yellow-500/20', 'text-yellow-400', 'border', 'border-yellow-500/40');
  }

  if (pageId === 'home') renderHome();
  if (pageId === 'feed') renderFeed();
  if (pageId === 'report') renderReportForm();
  if (pageId === 'dashboard') renderTimeline();
  if (pageId === 'audit') renderAudit();
  if (pageId === 'admin') renderAdmin();
}

function rotateQuote() {
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  document.getElementById('quoteText').innerText = `"${QUOTES[quoteIndex].text}"`;
  document.getElementById('quoteAuthor').innerText = `— ${QUOTES[quoteIndex].author}`;
}

function renderHome() {
  const grid = document.getElementById('monasteriesGrid');
  if (!grid) return;
  
  grid.innerHTML = MONASTERIES.map(m => `
    <div class="glass-3d-card p-6 space-y-4 hover-3d-lift flex flex-col justify-between cursor-pointer" onclick="openDrawer('${m.id}')">
      <div class="space-y-3">
        <div class="h-48 rounded-2xl overflow-hidden relative shadow-lg">
          <img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 bg-red-950/90 text-yellow-400 border border-yellow-500/50 text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md">
            Built ${m.builtYear}
          </span>
          <div class="absolute bottom-3 left-3 right-3">
            <span class="text-[10px] text-yellow-400 font-extrabold uppercase tracking-widest">${m.district}</span>
            <h3 class="font-serif-title font-bold text-lg text-white">${m.name}</h3>
          </div>
        </div>
        <p class="text-xs text-gray-300 leading-relaxed">${m.description}</p>
      </div>

      <div class="flex justify-between items-center text-xs pt-3 border-t border-yellow-500/20 font-bold">
        <span class="text-yellow-400 font-mono">Health Index: ${m.healthScore}%</span>
        <span class="text-teal-300 font-serif">Pop-Out Details ➔</span>
      </div>
    </div>
  `).join('');
}

function openDrawer(mId) {
  const m = MONASTERIES.find(x => x.id === mId) || MONASTERIES[0];
  const title = document.getElementById('drawerTitle');
  const body = document.getElementById('drawerBody');
  const drawer = document.getElementById('popoutDrawer');

  if (title) title.innerText = m.name;
  if (body) {
    body.innerHTML = `
      <img src="${m.image}" class="w-full h-44 object-cover rounded-2xl border border-yellow-500/40 shadow-xl">
      <p class="text-gray-200 leading-relaxed">${m.description}</p>
      
      <div class="bg-[#1C1E2B] p-3.5 rounded-xl space-y-1.5 text-xs">
        <div class="flex justify-between"><span>Built Year:</span><strong class="text-yellow-400">${m.builtYear}</strong></div>
        <div class="flex justify-between"><span>Sect Order:</span><strong class="text-white">${m.sect}</strong></div>
        <div class="flex justify-between"><span>District:</span><strong class="text-teal-300">${m.district}</strong></div>
        <div class="flex justify-between"><span>Health Index:</span><strong class="text-emerald-400">${m.healthScore}%</strong></div>
        <div class="flex justify-between"><span>ASI Protection:</span><strong class="text-yellow-400">${m.asiProtected ? 'ASI Protected Monument' : 'State Tourism Monastic Cell'}</strong></div>
      </div>

      <div class="space-y-2">
        <h4 class="font-bold text-yellow-400 text-xs">Key Heritage Assets:</h4>
        <div class="flex flex-wrap gap-1.5">
          ${m.keyAssets.map(a => `<span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-[10px]">${a}</span>`).join('')}
        </div>
      </div>

      <button onclick="switchPage('report'); closeDrawer();" class="w-full py-3.5 bg-yellow-500 text-black font-extrabold rounded-xl text-xs hover-3d-lift shadow-lg">
        📸 Report Heritage Decay for ${m.name}
      </button>
    `;
  }
  if (drawer) drawer.classList.remove('hidden');
}

function closeDrawer() {
  const drawer = document.getElementById('popoutDrawer');
  if (drawer) drawer.classList.add('hidden');
}

function updateGovtRoutingBadge() {
  const mId = document.getElementById('reportMonasterySelect')?.value;
  const cat = document.getElementById('reportCategorySelect')?.value;
  const m = MONASTERIES.find(x => x.id === mId);
  const deptName = document.getElementById('govtDeptName');
  const contactInfo = document.getElementById('govtContactInfo');

  if (!deptName || !contactInfo) return;

  if (m && m.asiProtected && ['mural', 'manuscript'].includes(cat)) {
    deptName.innerText = "Archaeological Survey of India (ASI) — Kolkata & Sikkim Circle";
    contactInfo.innerText = "asi.sikkimcircle@nic.in | Emergency Hotline: 03592-202241";
  } else {
    deptName.innerText = "Department of Tourism & Civil Aviation, Government of Sikkim";
    contactInfo.innerText = "heritage.tourism@sikkim.gov.in | Control Room: 03592-209090";
  }
}

function renderFeed() {
  const grid = document.getElementById('feedReportsGrid');
  if (!grid) return;

  grid.innerHTML = reports.map(r => {
    const m = MONASTERIES.find(x => x.id === r.monasteryId);
    return `
      <div class="glass-3d-card p-6 space-y-4 text-xs text-white hover-3d-lift">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-serif-title font-bold text-base text-yellow-400">🛕 ${m?.name || r.monasteryId}</h3>
            <p class="text-[10px] font-mono text-gray-400">${r.id} • ${r.createdAt}</p>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-900/80 text-teal-200 border border-teal-500/40">${r.status.toUpperCase()}</span>
        </div>
        <p class="text-gray-200 leading-relaxed font-sans">${r.description}</p>
        <div class="flex justify-between items-center pt-3 border-t border-yellow-500/20">
          <button onclick="upvote('${r.id}')" class="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold hover-3d-lift">
            👍 Upvote (${r.upvotes})
          </button>
          <button onclick="openAdoptModal('${r.id}')" class="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover-3d-lift">
            🤝 Adopt Repair
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function upvote(id) {
  const r = reports.find(x => x.id === id);
  if (r) {
    r.upvotes += 1;
    saveReports();
    renderFeed();
  }
}

function openAdoptModal(id) {
  const modal = document.getElementById('adoptModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdoptModal() {
  const modal = document.getElementById('adoptModal');
  if (modal) modal.classList.add('hidden');
}

function confirmAdoptPledge() {
  alert("Thank you! Your Adopt-a-Repair pledge of ₹25,000 INR has been recorded!");
  closeAdoptModal();
}

function renderReportForm() {
  const select = document.getElementById('reportMonasterySelect');
  if (select) {
    select.innerHTML = MONASTERIES.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  }
  updateGovtRoutingBadge();
}

function handleReportSubmit(e) {
  e.preventDefault();
  const mId = document.getElementById('reportMonasterySelect').value;
  const cat = document.getElementById('reportCategorySelect').value;
  const desc = document.getElementById('reportDesc').value;

  const newReport = {
    id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    monasteryId: mId,
    categoryKey: cat,
    description: desc,
    upvotes: 1,
    status: "pending",
    createdAt: new Date().toISOString().split('T')[0]
  };

  reports.unshift(newReport);
  saveReports();
  alert("Decay Report Logged & Auto-Routed to Government Authority!");
  switchPage('feed');
}

function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  container.innerHTML = MONASTERIES.map(m => `
    <div class="glass-3d-card p-6 space-y-3 text-xs text-white">
      <div class="flex justify-between items-center">
        <h3 class="font-serif-title font-bold text-lg text-yellow-400">🛕 ${m.name}</h3>
        <span class="font-mono text-teal-300 font-bold">Health Index: ${m.healthScore}%</span>
      </div>
      <p class="text-gray-300">${m.description}</p>
    </div>
  `).join('');
}

function renderAudit() {
  const list = document.getElementById('auditReportList');
  if (!list) return;

  list.innerHTML = reports.map(r => `
    <div class="p-3.5 bg-[#12131A] rounded-xl border border-yellow-500/20 text-xs flex justify-between items-center">
      <span><strong>${r.id}</strong> — ${r.description}</span>
      <span class="font-mono text-yellow-400 font-bold">${r.status.toUpperCase()}</span>
    </div>
  `).join('');
}

function renderAdmin() {
  const list = document.getElementById('adminReportsList');
  if (!list) return;

  list.innerHTML = reports.map(r => `
    <div class="glass-3d-card p-4 text-xs space-y-2 text-white flex justify-between items-center">
      <div>
        <p class="font-bold text-yellow-400">${r.id} (${r.monasteryId})</p>
        <p class="text-gray-300">${r.description}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="changeStatus('${r.id}', 'verified')" class="px-3 py-1.5 bg-teal-600 rounded text-[11px] font-bold hover-3d-lift">Verify</button>
        <button onclick="changeStatus('${r.id}', 'resolved')" class="px-3 py-1.5 bg-emerald-600 rounded text-[11px] font-bold hover-3d-lift">Resolve</button>
      </div>
    </div>
  `).join('');
}

function changeStatus(id, status) {
  const r = reports.find(x => x.id === id);
  if (r) {
    r.status = status;
    saveReports();
    renderAdmin();
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('monastery360_theme', isLight ? 'light' : 'dark');
}

function changeLanguage(langCode) {
  localStorage.setItem('monastery360_lang', langCode);
  alert(`Language switched to ${langCode.toUpperCase()}`);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('monastery360_theme') === 'light') {
    document.body.classList.add('light-mode');
  }
  renderHome();
});

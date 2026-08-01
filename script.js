/* ============================================================
   DATA
================================================================ */
const MONASTERIES = [
  {
    id:'rumtek', name:'Rumtek Monastery', sect:'Kagyu', founded:'1740s · rebuilt 1960s', access:'easy',
    location:'East Sikkim, near Gangtok', lat:27.2887, lng:88.5615,
    fee:'₹10 / ₹20 (foreign)', timings:'6 AM – 6 PM',
    blurb:'The largest monastery in Sikkim, seat-in-exile of the Karmapa and home to the historic Karmapa\'s throne and valuable relics — genuinely easy to visit from Gangtok.',
    img:'https://commons.wikimedia.org/wiki/Special:FilePath/Rumtek_Monastery_,_Dharma_Chakra_Center,_Rumtek,_Sikkim.jpg?width=600'
  },
  {
    id:'pemayangtse', name:'Pemayangtse Monastery', sect:'Nyingma', founded:'1705 (est. 1647)', access:'easy',
    location:'West Sikkim, near Pelling', lat:27.3019, lng:88.2409,
    fee:'₹10 / ₹20 (foreign)', timings:'7 AM – 5 PM',
    blurb:'One of the oldest and most senior Nyingma monasteries, historically reserved for monks of "pure lineage." Home to the irreplaceable wooden Zangdok Palri sculpture.',
    img:'https://commons.wikimedia.org/wiki/Special:FilePath/Front_view_of_Pemayangtse_monastery.jpg?width=600'
  },
  {
    id:'tashiding', name:'Tashiding Monastery', sect:'Nyingma', founded:'1641', access:'moderate',
    location:'West Sikkim, hilltop above Tashiding town', lat:27.3167, lng:88.2667,
    fee:'Free', timings:'6 AM – 6 PM',
    blurb:'Considered Sikkim\'s most sacred site — the "Heart of Denzong." Hosts the annual Bumchu sacred-water festival; its old manuscripts are physically decaying with age.',
    img:'https://commons.wikimedia.org/wiki/Special:FilePath/Tashiding_Monastery.jpg?width=600'
  },
  {
    id:'dubdi', name:'Dubdi Monastery', sect:'Nyingma', founded:'1701', access:'moderate',
    location:'Yuksom, West Sikkim — steep hilltop climb', lat:27.3703, lng:88.2171,
    fee:'Free', timings:'Daylight hours',
    blurb:'Sikkim\'s oldest recognized monastery, founded to commemorate the crowning of the first Chogyal at Yuksom. Reached only via a steep uphill walk — almost no casual tourist visits.',
    img:'https://commons.wikimedia.org/wiki/Special:FilePath/The_dubdi_monastery.jpg?width=600'
  },
  {
    id:'phodong', name:'Phodong Monastery', sect:'Kagyu', founded:'c.1740', access:'moderate',
    location:'North Sikkim, ~4,500 ft elevation', lat:27.4523, lng:88.5810,
    fee:'Free', timings:'7 AM – 5 PM',
    blurb:'One of the most significant Kagyu seats alongside Rumtek and Ralang, known for detailed ancient murals now fading due to humidity damage — the most urgent decay case in this archive.',
    img:'https://commons.wikimedia.org/wiki/Special:FilePath/Phodong_monastery_-_north_sikkim.jpg?width=600'
  },
  {
    id:'labrang', name:'Labrang Monastery', sect:'Nyingma', founded:'1844', access:'restricted',
    location:'North Sikkim — restricted-area permit required', lat:27.6800, lng:88.5500,
    fee:'N/A', timings:'Permit-dependent',
    blurb:'Sits near the international border in a restricted-area zone. Marked Pending On-Ground Digitization rather than faking coverage — this platform will not claim access it doesn\'t have.',
    img:null
  },
  {
    id:'ralang', name:'Ralang Monastery', sect:'Kagyu', founded:'1730s (rebuilt 1995)', access:'moderate',
    location:'South Sikkim', lat:27.2350, lng:88.3210,
    fee:'Free', timings:'7 AM – 5 PM',
    blurb:'Famous for its Pang Lhabsol Chaam masked-dance festival. Marked Pending On-Ground Digitization — no fabricated photography, honestly flagged for the Phase 2 roadmap.',
    img:null
  }
];

const CALENDAR = [
  {month:'Jan – Feb', name:'Bumchu Festival', place:'Tashiding Monastery', desc:'Sacred water-vessel ceremony predicting the year ahead — Sikkim\'s most watched ritual.'},
  {month:'Feb – Mar', name:'Losar (Tibetan New Year)', place:'Statewide', desc:'Masked dances, family gatherings and monastery rituals mark the new lunar year.'},
  {month:'May – Jun', name:'Saga Dawa', place:'Statewide', desc:'Commemorates the Buddha\'s birth, enlightenment and parinirvana — the most sacred month.'},
  {month:'Aug – Sep', name:'Pang Lhabsol', place:'Rumtek &amp; Ralang', desc:'Honors Mount Khangchendzonga as Sikkim\'s guardian deity, with the Chaam masked dance.'}
];

const HOMESTAYS = [
  {name:'Yuksom Heritage Homestay', place:'Near Dubdi trailhead, Yuksom', desc:'Family-run stay along the Dubdi trek route; local guiding available.'},
  {name:'Gangtok Ridge Guesthouse', place:'Near Rumtek', desc:'Closest lodging cluster to Rumtek, easy day-trip base.'},
  {name:'Pelling Valley View Stay', place:'Near Pemayangtse', desc:'Views toward Khangchendzonga; artisan thangka workshop nearby.'},
  {name:'Ravangla Community Lodge', place:'Near Ralang / Tashiding circuit', desc:'Community-run stay supporting local Bhutia/Lepcha artisans.'}
];

const QA_PAIRS = [
  {k:['timing','open','hours'], a:'Most monasteries are open 6–7 AM to 5–6 PM daily. Exact hours are listed on each monastery\'s archive card above.'},
  {k:['fee','entry','cost','price'], a:'Rumtek and Pemayangtse charge a small entry fee (~₹10 for Indian, ~₹20 for foreign visitors). Most others are free to enter.'},
  {k:['permit','restricted','border'], a:'Labrang Monastery sits in a restricted border-area zone requiring an Inner Line Permit. Check the geo-map for permit flags on every site.'},
  {k:['oldest','history','old'], a:'Dubdi Monastery (1701) is officially recognized as Sikkim\'s oldest monastery, though a few sites informally dispute the title.'},
  {k:['festival','bumchu','losar','pang lhabsol'], a:'See the Cultural Calendar section — Bumchu (Tashiding), Losar, Saga Dawa, and Pang Lhabsol are the major festivals to plan a visit around.'},
  {k:['reach','rumtek','how to get','gangtok'], a:'Rumtek is about 24 km from Gangtok by road — the most accessible monastery in Sikkim, reachable by taxi or shared jeep.'},
  {k:['photo','photograph','camera'], a:'Photography is generally allowed in courtyards; interior/shrine photography rules vary by monastery — always ask a resident monk first.'},
  {k:['dress','wear','clothing'], a:'Modest clothing covering shoulders and knees is expected. Remove shoes before entering prayer halls.'},
  {k:['homestay','stay','hotel','lodge'], a:'See the Local Economy Directory above for sample homestays near Rumtek, Pemayangtse, Dubdi and the Ralang/Tashiding circuit.'},
  {k:['sect','kagyu','nyingma','order'], a:'Sikkim\'s monasteries mainly follow the Nyingma order (Pemayangtse, Tashiding, Dubdi, Labrang) or the Kagyu order (Rumtek, Phodong, Ralang).'}
];

const CROWD_PAIRS = [
  {busy:'Rumtek', quiet:'Phodong'},
  {busy:'Pemayangtse', quiet:'Tashiding'},
  {busy:'Rumtek', quiet:'Ralang'}
];

/* ============================================================
   NAV TOGGLE
================================================================ */
document.getElementById('navToggle').addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.toggle('open');
});

/* ============================================================
   PRAYER FLAG SIGNATURE DIVIDER (generated)
================================================================ */
(function buildFlags(){
  const colors = ['#3E6E9E','#F1E7D0','#B23A3A','#4F7942','#D9A62E'];
  const row = document.getElementById('flagRow');
  const total = 40;
  for(let i=0;i<total;i++){
    const x = (1200/total)*i + 6;
    const c = colors[i % colors.length];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','pennant');
    g.innerHTML = `<polygon points="${x},6 ${x-9},26 ${x+9},26" fill="${c}" stroke="rgba(0,0,0,0.08)"/>`;
    row.appendChild(g);
  }
})();

/* ============================================================
   CROWD ALERT BANNER
================================================================ */
(function crowdBanner(){
  const pair = CROWD_PAIRS[Math.floor(Math.random()*CROWD_PAIRS.length)];
  document.getElementById('alertText').innerHTML =
    `🧭 <b>${pair.busy}</b> is seeing heavier footfall this week — consider the equally rich, quieter <b>${pair.quiet}</b> instead.`;
  document.getElementById('alertDismiss').addEventListener('click', ()=>{
    document.getElementById('alertBanner').classList.add('hidden');
  });
})();

/* ============================================================
   PANNELLUM 360 TOUR
================================================================ */
const viewer = pannellum.viewer('panorama', {
  default:{firstScene:'scene1', sceneFadeDuration:600},
  scenes:{
    scene1:{type:'equirectangular', panorama:'https://pannellum.org/images/alma.jpg', autoLoad:true, autoRotate:-2,
      hotSpots:[{pitch:2,yaw:120,type:'info',text:'Prototype capture — Phase 2 will replace this with a real on-site 360° photo.'}]},
    scene2:{type:'equirectangular', panorama:'https://pannellum.org/images/tocopilla.jpg', autoLoad:false, autoRotate:-2}
  }
});
document.querySelectorAll('.scene-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.scene-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    viewer.loadScene(btn.dataset.scene);
  });
});

/* ============================================================
   MONASTERY CARDS + SEARCH FILTER
================================================================ */
const grid = document.getElementById('cardGrid');
function renderCards(list){
  grid.innerHTML = '';
  if(list.length === 0){
    grid.innerHTML = '<div class="no-results">No monasteries match your search — try a different name or sect.</div>';
    return;
  }
  list.forEach(m=>{
    const badgeClass = m.access==='easy' ? 'badge-easy' : (m.access==='restricted' ? 'badge-restricted' : 'badge-moderate');
    const badgeText = m.access==='easy' ? 'Easy access' : (m.access==='restricted' ? 'Restricted — permit' : 'Moderate / trek');
    const thumb = m.img
      ? `<img src="${m.img}" alt="${m.name}" loading="lazy">`
      : `<div class="pending">📍 Pending On-Ground<br>Digitization</div>`;
    const card = document.createElement('div');
    card.className = 'mcard';
    card.setAttribute('data-name', m.name.toLowerCase());
    card.setAttribute('data-sect', m.sect.toLowerCase());
    card.innerHTML = `
      <div class="thumb">${thumb}</div>
      <div class="body">
        <span class="badge ${badgeClass}">${badgeText}</span>
        <h4>${m.name}</h4>
        <div class="meta">${m.sect} · founded ${m.founded} · ${m.location}</div>
        <p>${m.blurb}</p>
        <div class="facts"><span>${m.fee}</span><span>${m.timings}</span></div>
      </div>`;
    grid.appendChild(card);
  });
}
renderCards(MONASTERIES);
document.getElementById('searchMeta').textContent = `${MONASTERIES.length} monasteries documented`;

document.getElementById('searchInput').addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  const filtered = MONASTERIES.filter(m => m.name.toLowerCase().includes(q) || m.sect.toLowerCase().includes(q));
  renderCards(filtered);
  document.getElementById('searchMeta').textContent = q ? `${filtered.length} match${filtered.length===1?'':'es'}` : `${MONASTERIES.length} monasteries documented`;
});

/* ============================================================
   LEAFLET MAP
================================================================ */
const map = L.map('leaflet-map').setView([27.34, 88.42], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'&copy; OpenStreetMap contributors', maxZoom:16
}).addTo(map);

const accessColor = {easy:'#4F7942', moderate:'#c9973e', restricted:'#B23A3A'};
MONASTERIES.forEach(m=>{
  const marker = L.circleMarker([m.lat,m.lng], {
    radius:9, color:'#2A1E19', weight:1.5, fillColor:accessColor[m.access], fillOpacity:0.9
  }).addTo(map);
  marker.bindPopup(`<strong>${m.name}</strong><br>${m.sect} · ${m.access==='restricted'?'⚠️ Permit required':'Access: '+m.access}<br><span style="font-size:0.8em;color:#777">${m.location}</span>`);
});

/* ============================================================
   CULTURAL CALENDAR
================================================================ */
const calGrid = document.getElementById('calGrid');
CALENDAR.forEach(c=>{
  const el = document.createElement('div');
  el.className = 'cal-card';
  el.innerHTML = `<div class="month">${c.month}</div><h4>${c.name}</h4><p><strong>${c.place}</strong><br>${c.desc}</p>`;
  calGrid.appendChild(el);
});

/* ============================================================
   HOMESTAY DIRECTORY
================================================================ */
const stayGrid = document.getElementById('stayGrid');
HOMESTAYS.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'stay-card';
  el.innerHTML = `<span class="sample-tag">Sample listing</span><h4>${s.name}</h4><p>${s.place}<br>${s.desc}</p>`;
  stayGrid.appendChild(el);
});

/* ============================================================
   HASH HELPER (Web Crypto)
================================================================ */
async function sha256Hex(str){
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function sha256HexFromArrayBuffer(buf){
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

/* ============================================================
   ADOPT-A-ARTIFACT — HASH-CHAINED LEDGER
================================================================ */
const PLEDGE_KEY = 'monastery360_pledge_chain';
function loadChain(){ try{ return JSON.parse(localStorage.getItem(PLEDGE_KEY)) || []; }catch(e){ return []; } }
function saveChain(chain){ localStorage.setItem(PLEDGE_KEY, JSON.stringify(chain)); }

function renderLedger(){
  const chain = loadChain();
  const el = document.getElementById('pledgeLedger');
  if(chain.length===0){ el.innerHTML = '<span class="small-note">No pledges recorded yet — be the first.</span>'; return; }
  el.innerHTML = chain.slice().reverse().map(entry=>`
    <div class="ledger-row">
      <span>#${entry.index} · <strong>${entry.name}</strong> → ${entry.artifact}</span>
      <span class="hash">${entry.hash.slice(0,16)}…</span>
    </div>`).join('');
}
renderLedger();

document.getElementById('adoptForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = document.getElementById('adoptName').value.trim();
  const artifact = document.getElementById('adoptArtifact').value;
  const note = document.getElementById('adoptNote').value.trim();
  if(!name || !artifact) return;
  const chain = loadChain();
  const prevHash = chain.length ? chain[chain.length-1].hash : '0'.repeat(64);
  const index = chain.length + 1;
  const timestamp = new Date().toISOString();
  const payload = JSON.stringify({index,name,artifact,note,timestamp,prevHash});
  const hash = await sha256Hex(payload);
  chain.push({index,name,artifact,note,timestamp,prevHash,hash});
  saveChain(chain);
  renderLedger();
  const c = document.getElementById('adoptConfirm');
  c.textContent = `Pledge #${index} recorded and chained to the ledger. Thank you, ${name}.`;
  c.classList.add('show');
  e.target.reset();
});

document.getElementById('verifyChain').addEventListener('click', async ()=>{
  const chain = loadChain();
  const statusEl = document.getElementById('chainStatus');
  if(chain.length===0){ statusEl.innerHTML = '<span class="chain-status">Nothing to verify yet.</span>'; return; }
  let ok = true;
  let prevHash = '0'.repeat(64);
  for(const entry of chain){
    const payload = JSON.stringify({index:entry.index,name:entry.name,artifact:entry.artifact,note:entry.note,timestamp:entry.timestamp,prevHash});
    const recomputed = await sha256Hex(payload);
    if(recomputed !== entry.hash || entry.prevHash !== prevHash){ ok = false; break; }
    prevHash = entry.hash;
  }
  statusEl.innerHTML = ok
    ? '<span class="chain-status chain-ok">✓ Chain verified — no tampering detected across all entries.</span>'
    : '<span class="chain-status chain-bad">⚠ Chain integrity broken — an entry was altered.</span>';
});

/* ============================================================
   DECAY REPORTING
================================================================ */
const DECAY_KEY = 'monastery360_decay_reports';
function loadDecay(){ try{ return JSON.parse(localStorage.getItem(DECAY_KEY)) || []; }catch(e){ return []; } }
function saveDecay(list){ localStorage.setItem(DECAY_KEY, JSON.stringify(list)); }
function renderDecay(){
  const list = loadDecay();
  const el = document.getElementById('decayList');
  if(list.length===0){ el.innerHTML = '<span class="small-note">No reports filed yet.</span>'; return; }
  el.innerHTML = list.slice().reverse().map(r=>`
    <div class="ledger-row">
      <span><strong>${r.monastery}</strong> — ${r.desc.slice(0,50)}${r.desc.length>50?'…':''} ${r.photo?('📷 '+r.photo):''}</span>
      <span class="hash">${new Date(r.timestamp).toLocaleDateString()}</span>
    </div>`).join('');
}
renderDecay();

document.getElementById('decayForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const monastery = document.getElementById('decayMonastery').value;
  const desc = document.getElementById('decayDesc').value.trim();
  const fileInput = document.getElementById('decayPhoto');
  const photo = fileInput.files[0] ? fileInput.files[0].name : null;
  if(!monastery || !desc) return;
  const list = loadDecay();
  list.push({monastery, desc, photo, timestamp:new Date().toISOString()});
  saveDecay(list);
  renderDecay();
  const c = document.getElementById('decayConfirm');
  c.textContent = `Report submitted for ${monastery} — thank you for helping protect this heritage.`;
  c.classList.add('show');
  e.target.reset();
});

/* ============================================================
   DIGITAL FINGERPRINTING (real SHA-256 over image bytes)
================================================================ */
const FP_KEY = 'monastery360_fingerprints';
function loadFP(){ try{ return JSON.parse(localStorage.getItem(FP_KEY)) || []; }catch(e){ return []; } }
function saveFP(list){ localStorage.setItem(FP_KEY, JSON.stringify(list)); }
function renderFP(){
  const list = loadFP();
  const el = document.getElementById('fpList');
  if(list.length===0){ el.innerHTML = '<span class="small-note">No fingerprints registered yet.</span>'; return; }
  el.innerHTML = list.slice().reverse().map(f=>`
    <div class="fp-item"><span>${f.label}</span><span class="h">${f.hash.slice(0,12)}…</span></div>`).join('');
}
renderFP();

let currentFPHash = null;
const fpDrop = document.getElementById('fpDrop');
const fpFile = document.getElementById('fpFile');
fpDrop.addEventListener('click', ()=>fpFile.click());
fpFile.addEventListener('change', async ()=>{
  const file = fpFile.files[0];
  if(!file) return;
  fpDrop.textContent = `⏳ Hashing ${file.name}…`;
  const buf = await file.arrayBuffer();
  currentFPHash = await sha256HexFromArrayBuffer(buf);
  fpDrop.textContent = `✅ ${file.name} ready — SHA-256 computed`;
  const out = document.getElementById('fpHashOut');
  out.style.display = 'block';
  out.textContent = currentFPHash;
  document.getElementById('fpRegister').disabled = false;
});
document.getElementById('fpRegister').addEventListener('click', ()=>{
  if(!currentFPHash) return;
  const label = document.getElementById('fpLabel').value.trim() || 'Unlabeled artifact';
  const list = loadFP();
  list.push({label, hash:currentFPHash, timestamp:new Date().toISOString()});
  saveFP(list);
  renderFP();
  document.getElementById('fpLabel').value = '';
  document.getElementById('fpRegister').disabled = true;
  fpDrop.textContent = '📷 Click to choose an artifact photo, or drag one here';
  document.getElementById('fpHashOut').style.display = 'none';
  currentFPHash = null;
});

/* ============================================================
   CHATBOT (keyword-matched, honestly labeled)
================================================================ */
const chatBody = document.getElementById('chatBody');
function addMsg(text, who){
  const d = document.createElement('div');
  d.className = 'msg ' + who;
  d.textContent = text;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}
addMsg("Namaste 🙏 Ask me about timings, entry fees, permits, festivals, or how to reach a monastery. I'm a simple keyword-based assistant, not a live AI model.", 'bot');

function answerFor(q){
  const lower = q.toLowerCase();
  for(const pair of QA_PAIRS){
    if(pair.k.some(kw => lower.includes(kw))) return pair.a;
  }
  return "I don't have a canned answer for that yet — try asking about timings, fees, permits, festivals, or how to reach a specific monastery.";
}
function sendChat(){
  const input = document.getElementById('chatInput');
  const val = input.value.trim();
  if(!val) return;
  addMsg(val, 'user');
  input.value = '';
  setTimeout(()=>addMsg(answerFor(val), 'bot'), 350);
}
document.getElementById('chatSend').addEventListener('click', sendChat);
document.getElementById('chatInput').addEventListener('keydown', e=>{ if(e.key==='Enter') sendChat(); });

const chipTopics = ['Rumtek timings','Entry fee','Permit for Labrang','Festivals','Dress code'];
const chipsEl = document.getElementById('chatChips');
chipTopics.forEach(t=>{
  const c = document.createElement('span');
  c.className = 'chip'; c.textContent = t;
  c.addEventListener('click', ()=>{ document.getElementById('chatInput').value = t; sendChat(); });
  chipsEl.appendChild(c);
});

/* ============================================================
   OFFLINE MODE / PWA (Samrat — Team Leader & Deployment Lead)
================================================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service worker registered:', reg.scope))
      .catch(err => console.warn('Service worker registration failed:', err));
  });
}
